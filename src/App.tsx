import React, { useState } from 'react';
import { CouncilTier, AuthState, Stage1Response, Stage2Response, Stage3Response } from './types/council';
import { executeStage1, executeStage2, executeStage3, COUNCIL_TIERS } from './services/api';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { SetupModal } from './components/SetupModal';
import { PipelineStepper } from './components/PipelineStepper';
import { DivergenceView } from './components/DivergenceView';
import { WarRoomView } from './components/WarRoomView';
import { SynthesisMemo } from './components/SynthesisMemo';
import { PortfolioModal } from './components/PortfolioModal';
import { Footer } from './components/Footer';
import { AlertCircle, RefreshCw, X, Sparkles, ArrowRight } from 'lucide-react';

const STORAGE_KEY = 'nirmay_council_auth_v1';

export const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      mode: 'demo',
      apiKey: '',
      passcode: '',
      proxyUrl: 'https://council-api-proxy.your-cloudflare-subdomain.workers.dev',
      isConfigured: true
    };
  });

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const [challenge, setChallenge] = useState(
    'A multinational automotive OEM faces rising geopolitical risk and export restrictions on lithium-ion battery cells. Evaluate whether to invest $1.8B in a greenfield domestic Gigafactory, establish a joint venture with a tier-1 Asian supplier, or secure multi-source long-term supply agreements. Balance capital expenditure risk against 5-year supply assurance.'
  );
  const [tier, setTier] = useState<CouncilTier>('medium');
  const [currentStage, setCurrentStage] = useState<0 | 1 | 2 | 3>(0);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  const [stage1Results, setStage1Results] = useState<Stage1Response[]>([]);
  const [stage2Results, setStage2Results] = useState<Stage2Response[]>([]);
  const [stage3Result, setStage3Result] = useState<Stage3Response | undefined>(undefined);

  const handleSaveAuth = (newAuth: AuthState) => {
    setAuth(newAuth);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAuth));
    } catch (e) {}
  };

  const handleReset = () => {
    setCurrentStage(0);
    setActiveTab(1);
    setIsProcessing(false);
    setGeneralError(null);
    setStage1Results([]);
    setStage2Results([]);
    setStage3Result(undefined);
  };

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
      const s1Final = await executeStage1(challenge, tier, auth, (index, updated) => {
        setStage1Results(prev => {
          const next = [...prev];
          next[index] = updated;
          return next;
        });
      });

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
    <div className="min-h-screen bg-[#faf9f5] text-stone-900 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      <Header
        auth={auth}
        onOpenSetup={() => setIsSetupOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onReset={handleReset}
        isProcessing={isProcessing}
      />

      {currentStage > 0 && (
        <PipelineStepper
          currentStage={currentStage}
          isProcessing={isProcessing}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          canNavigateTabs={!isProcessing || currentStage === 3}
        />
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8">
        {generalError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 text-red-900 animate-fadeIn shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-xs sm:text-sm">
              <span className="font-bold">Gateway Deliberation Warning: </span>
              {generalError}
            </div>
            <button
              onClick={() => setGeneralError(null)}
              className="text-red-400 hover:text-red-600 font-bold"
            >
              ✕
            </button>
          </div>
        )}

        {currentStage === 0 && (
          <InputSection
            challenge={challenge}
            setChallenge={setChallenge}
            tier={tier}
            setTier={setTier}
            onConvene={handleConvene}
            onOpenGuide={() => setIsGuideOpen(true)}
            isProcessing={isProcessing}
            canConvene={challenge.trim().length > 10}
          />
        )}

        {currentStage > 0 && (
          <div className="space-y-6">
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-semibold border border-amber-200">
                    Active Deliberation Mandate
                  </span>
                  <span className="text-xs text-stone-500 font-mono">
                    Tier: {COUNCIL_TIERS[tier].name}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-stone-800 line-clamp-2 max-w-4xl">
                  {challenge}
                </p>
              </div>

              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="self-start sm:self-auto px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                <span>New Problem</span>
              </button>
            </div>

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

      <Footer
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenSetup={() => setIsSetupOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Payment & Access Modal (Features Google Pay QR & Token Economics) */}
      <SetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        auth={auth}
        onSaveAuth={handleSaveAuth}
      />

      {/* LLM Council Architecture & Andrej Karpathy Guide Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#faf9f5] border border-stone-200 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 sm:px-8 py-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center font-serif text-lg font-bold">
                  ✦
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                    The LLM Council Architecture & Guide
                  </h2>
                  <p className="text-xs text-stone-500 font-sans">
                    Why single LLMs fail and how multi-agent adversarial peer review solves the "Yes-Man" AI problem
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsGuideOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="space-y-4">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-mono font-bold uppercase tracking-wider">
                    The Core Premise
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-tight">
                    Don't ask for answers. <br />
                    <span className="text-amber-700">Convene a council.</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    Stop your <strong>Yes-Man AI</strong> and build a board of advisors that <em>argues before it agrees</em>. Standard frontier models suffer from RLHF sycophancy—they want to please the user, confirming your biases rather than exposing fatal operational flaws.
                  </p>
                  <div className="space-y-2 pt-2 text-xs text-stone-700 font-sans">
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">1.</span>
                      <span><strong>Divergence:</strong> 4 frontier models independently formulate solutions with zero shared context.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">2.</span>
                      <span><strong>The War Room:</strong> Proposals are stripped of model names (Proposal Alpha, Beta, Gamma, Delta) and blindly peer-audited.</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="text-amber-600 font-bold">3.</span>
                      <span><strong>Synthesis:</strong> The Chairman model reviews all proposals and critiques, delivering a definitive Executive Decision Memo.</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl overflow-hidden border border-stone-200 shadow-md bg-stone-100">
                  <img
                    src="/images/llm-council-poster.jpg"
                    alt="The LLM Council - Don't ask for answers, convene a council"
                    className="w-full h-auto object-cover hover:scale-[1.02] transition-transform duration-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center bg-stone-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl">
                <div className="md:col-span-1 rounded-xl overflow-hidden border border-stone-800 shadow-lg">
                  <img
                    src="/images/karpathy.jpg"
                    alt="Andrej Karpathy"
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-3 bg-stone-950 text-center">
                    <div className="font-serif font-bold text-sm text-white">Andrej Karpathy</div>
                    <div className="text-[10px] text-stone-400 font-mono">Founding Member, OpenAI • Former Tesla AI Director</div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-3.5">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Test-Time Compute & System 2 Deliberation</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                    "We are moving from instantaneous token generation to deliberate cognitive reasoning."
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
                    As Karpathy has highlighted in his research on modern LLM scaling laws, frontier AI capability is moving beyond pre-training compute toward <strong>test-time deliberation</strong>. 
                    Instead of demanding that a single neural network produce an answer in 400 milliseconds, giving multiple independent models the architectural runway to think, critique each other, and reconcile disparate viewpoints unlocks true boardroom-level reasoning.
                  </p>
                  <div className="p-3.5 bg-stone-950/80 rounded-xl border border-stone-800 text-xs text-stone-300 font-mono space-y-1">
                    <div className="text-amber-400 font-bold">Key Architectural Principle:</div>
                    <div className="text-stone-400 text-[11px] leading-relaxed">
                      Anonymized peer review eliminates identity bias: Claude 3.5 audits GPT-4o, DeepSeek R1 red-teams Gemini 2.5 Pro, and the Chairman synthesizes truth from tension.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between">
              <div className="text-xs text-stone-500 font-sans">
                Academic Open Source • Demonstrated for IIM Executive Education
              </div>
              <button
                onClick={() => {
                  setIsGuideOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center space-x-2"
              >
                <span>Convene Council Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
              </button>
            </div>
          </div>
        </div>
      )}

      <PortfolioModal
        isOpen={isPortfolioOpen}
        onClose={() => setIsPortfolioOpen(false)}
      />
    </div>
  );
};

export default App;
