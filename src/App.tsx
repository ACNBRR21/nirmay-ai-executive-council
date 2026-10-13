import React, { useState } from 'react';
import { CouncilTier, AuthState, Stage1Response, Stage2Response, Stage3Response } from './types/council';
import { executeStage1, executeStage2, executeStage3, COUNCIL_TIERS } from './services/api';
import { Header } from './components/Header';
import { PipelineStepper } from './components/PipelineStepper';
import { InputSection } from './components/InputSection';
import { DivergenceView } from './components/DivergenceView';
import { WarRoomView } from './components/WarRoomView';
import { SynthesisMemo } from './components/SynthesisMemo';
import { SetupModal } from './components/SetupModal';
import { PortfolioModal } from './components/PortfolioModal';
import { Footer } from './components/Footer';
import { AlertCircle, RefreshCw } from 'lucide-react';

const STORAGE_KEY = 'nirmay_council_auth_v1';

export const App: React.FC = () => {
  // Authentication State
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load saved auth:', e);
    }
    return {
      mode: 'demo',
      apiKey: '',
      passcode: '',
      proxyUrl: 'https://council-api-proxy.your-cloudflare-subdomain.workers.dev',
      isConfigured: true
    };
  });

  // UI Modal States
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  // Council Execution State
  const [challenge, setChallenge] = useState(
    'A tier-1 hospital network with 42 centers is deploying an AI diagnostic and eye-drop compliance tracking system (inspired by Nirmay.health). Clinicians express liability concerns, while IT flags HIPAA/DPDP data privacy compliance. Define the phased rollout strategy to secure physician adoption, institutional governance, and quantifiable patient outcome metrics.'
  );
  const [tier, setTier] = useState<CouncilTier>('medium');
  const [currentStage, setCurrentStage] = useState<0 | 1 | 2 | 3>(0);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Stage Results
  const [stage1Results, setStage1Results] = useState<Stage1Response[]>([]);
  const [stage2Results, setStage2Results] = useState<Stage2Response[]>([]);
  const [stage3Result, setStage3Result] = useState<Stage3Response | undefined>(undefined);

  // Save auth changes to localStorage
  const handleSaveAuth = (newAuth: AuthState) => {
    setAuth(newAuth);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuth));
    } catch (e) {
      console.error('Failed to persist auth:', e);
    }
  };

  // Reset Council Session
  const handleReset = () => {
    setCurrentStage(0);
    setActiveTab(1);
    setIsProcessing(false);
    setGeneralError(null);
    setStage1Results([]);
    setStage2Results([]);
    setStage3Result(undefined);
  };

  // Master Orchestration
  const handleConvene = async () => {
    if (!challenge.trim()) return;

    if (!auth.isConfigured && auth.mode !== 'demo') {
      setIsSetupOpen(true);
      return;
    }

    setGeneralError(null);
    setIsProcessing(true);
    setCurrentStage(1);
    setActiveTab(1);

    const currentModels = COUNCIL_TIERS[tier].models;
    const initialStage1: Stage1Response[] = currentModels.map((m, idx) => ({
      modelId: m.id,
      modelName: m.name,
      label: ['Proposal Alpha', 'Proposal Beta', 'Proposal Gamma', 'Proposal Delta'][idx] as any,
      rawOutput: '',
      status: 'running'
    }));
    setStage1Results(initialStage1);

    try {
      // STAGE 1: DIVERGENCE
      const s1Final = await executeStage1(challenge, tier, auth, (index, updated) => {
        setStage1Results(prev => {
          const next = [...prev];
          next[index] = updated;
          return next;
        });
      });

      // STAGE 2: THE WAR ROOM
      setCurrentStage(2);
      setActiveTab(2);

      const initialStage2: Stage2Response[] = currentModels.map(m => ({
        modelId: m.id,
        modelName: m.name,
        rawOutput: '',
        status: 'running'
      }));
      setStage2Results(initialStage2);

      const s2Final = await executeStage2(challenge, s1Final, tier, auth, (index, updated) => {
        setStage2Results(prev => {
          const next = [...prev];
          next[index] = updated;
          return next;
        });
      });

      // STAGE 3: EXECUTIVE SYNTHESIS
      setCurrentStage(3);
      setActiveTab(3);

      const s3Final = await executeStage3(challenge, s1Final, s2Final, tier, auth);
      setStage3Result(s3Final);
    } catch (err: any) {
      console.error('Council Execution Error:', err);
      setGeneralError(err.message || 'An unexpected error occurred during council deliberation.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Executive Header */}
      <Header
        auth={auth}
        onOpenSetup={() => setIsSetupOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onReset={handleReset}
        isProcessing={isProcessing}
      />

      {/* Pipeline Stepper */}
      {currentStage > 0 && (
        <PipelineStepper
          currentStage={currentStage}
          isProcessing={isProcessing}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          canNavigateTabs={!isProcessing || currentStage === 3}
        />
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        {/* Error Notification */}
        {generalError && (
          <div className="p-4 bg-red-950/40 border border-red-800 rounded-2xl flex items-start space-x-3 text-red-200 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-xs">
              <span className="font-bold">Gateway Deliberation Warning: </span>
              {generalError}
            </div>
            <button
              onClick={() => setGeneralError(null)}
              className="text-red-400 hover:text-red-300 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {/* Input & Problem Formulation Section */}
        {currentStage === 0 && (
          <InputSection
            challenge={challenge}
            setChallenge={setChallenge}
            tier={tier}
            setTier={setTier}
            onConvene={handleConvene}
            isProcessing={isProcessing}
            canConvene={challenge.trim().length > 10}
          />
        )}

        {/* Active Deliberation View Tabs */}
        {currentStage > 0 && (
          <div className="space-y-6">
            {/* Quick Session Context Header */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 backdrop-blur-md">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 font-semibold text-indigo-300 border border-slate-700">
                    Active Mandate
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    Tier: {COUNCIL_TIERS[tier].name}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-slate-200 line-clamp-2 max-w-4xl">
                  {challenge}
                </p>
              </div>

              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="self-start sm:self-auto px-4 py-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold transition-all flex items-center space-x-2 shadow-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                <span>New Dilemma</span>
              </button>
            </div>

            {/* Stage Tab Content */}
            {activeTab === 1 && (
              <DivergenceView
                results={stage1Results}
                tier={tier}
                isProcessing={isProcessing && currentStage === 1}
              />
            )}

            {activeTab === 2 && (
              <WarRoomView
                stage1Results={stage1Results}
                stage2Results={stage2Results}
                tier={tier}
                isProcessing={isProcessing && currentStage === 2}
              />
            )}

            {activeTab === 3 && (
              <SynthesisMemo
                stage3Result={stage3Result}
                tier={tier}
                isProcessing={isProcessing && currentStage === 3}
                onReset={handleReset}
              />
            )}
          </div>
        )}
      </main>

      {/* Executive Footer */}
      <Footer
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenSetup={() => setIsSetupOpen(true)}
      />

      {/* Setup / Access Mode Modal */}
      <SetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        auth={auth}
        onSaveAuth={handleSaveAuth}
      />

      {/* Rishi Roy Portfolio Showcase Modal */}
      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
      />
    </div>
  );
};

export default App;
