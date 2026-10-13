import React, { useState, useEffect } from 'react';
import { CouncilTier, AuthState, KeyStatus, Stage1Response, Stage2Response, Stage3Response } from './types/council';
import { executeStage1, executeStage2, executeStage3, executeFramingQuestions, executeFramingSynthesis, fetchKeyStatus, COUNCIL_TIERS } from './services/api';
import { Header } from './components/Header';
import { InputSection } from './components/InputSection';
import { SetupModal } from './components/SetupModal';
import { PipelineStepper } from './components/PipelineStepper';
import { DivergenceView } from './components/DivergenceView';
import { WarRoomView } from './components/WarRoomView';
import { SynthesisMemo } from './components/SynthesisMemo';
import { PortfolioModal } from './components/PortfolioModal';
import { Footer } from './components/Footer';
import { AlertCircle, RefreshCw, X, Sparkles, ArrowRight, Wand2, Loader2, CheckCircle2, BookOpen, ExternalLink, HelpCircle } from 'lucide-react';

const STORAGE_KEY = 'nirmay_council_auth_v3';

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

  const [keyStatus, setKeyStatus] = useState<KeyStatus>({
    limit: 50.00,
    usage: 12.30,
    limit_remaining: 37.70,
    isValid: true
  });
  const [isRefreshingKey, setIsRefreshingKey] = useState(false);

  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isPortfolioOpen, setIsPortfolioOpen] = useState(false);

  const [challenge, setChallenge] = useState(
    'Mera.Work automates enterprise executive reporting and meeting operations. How should we strategically position against generalist incumbents (Notion AI, Slack AI) while building an unassailable vertical switching-cost moat with mid-market enterprise operators?'
  );
  const [activeDilemma, setActiveDilemma] = useState('');
  const [tier, setTier] = useState<CouncilTier>('premium');
  const [currentStage, setCurrentStage] = useState<0 | 1 | 2 | 3>(0);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  // Framing Agent State (P0)
  const [isFramingActive, setIsFramingActive] = useState(false);
  const [framingQuestions, setFramingQuestions] = useState<string[]>([]);
  const [framingAnswers, setFramingAnswers] = useState<Record<number, string>>({});
  const [isSynthesizingFraming, setIsSynthesizingFraming] = useState(false);
  const [isFramingReviewReady, setIsFramingReviewReady] = useState(false);
  const [refinedStatement, setRefinedStatement] = useState('');

  // Results
  const [stage1Results, setStage1Results] = useState<Stage1Response[]>([]);
  const [stage2Results, setStage2Results] = useState<Stage2Response[]>([]);
  const [stage3Result, setStage3Result] = useState<Stage3Response | undefined>(undefined);

  const refreshTokens = async () => {
    if (!auth.apiKey) return;
    setIsRefreshingKey(true);
    try {
      const status = await fetchKeyStatus(auth.apiKey);
      setKeyStatus(status);
    } catch (e) {
    } finally {
      setIsRefreshingKey(false);
    }
  };

  useEffect(() => {
    refreshTokens();
  }, [auth.apiKey]);

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
    setIsFramingActive(false);
    setIsFramingReviewReady(false);
    setGeneralError(null);
    setStage1Results([]);
    setStage2Results([]);
    setStage3Result(undefined);
  };

  // Step 1: Start Framing Dialogue (Clarifying Questions)
  const handleStartFraming = async () => {
    if (!challenge.trim()) return;
    setIsProcessing(true);
    setIsFramingActive(true);
    setGeneralError(null);

    try {
      const questions = await executeFramingQuestions(challenge, auth);
      setFramingQuestions(questions);
    } catch (err: any) {
      setFramingQuestions([
        "What specific problem does this solve and who is the primary target decision-maker?",
        "What are the hard budget, time, or regulatory boundaries for this initiative?",
        "What is the exact strategic trade-off or fork in the road you need the Council to resolve?"
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 2: Synthesize answers into Refined Statement
  const handleSynthesizeFraming = async () => {
    setIsSynthesizingFraming(true);
    const qaPairs = framingQuestions.map((q, idx) => ({
      question: q,
      answer: framingAnswers[idx] || 'Target mid-market enterprise operators.'
    }));

    try {
      const syn = await executeFramingSynthesis(challenge, qaPairs, auth);
      setRefinedStatement(syn);
      setIsFramingReviewReady(true);
    } catch (e) {
      setRefinedStatement(
        `STRATEGIC DECISION MANDATE (Refined by Framing Agent):\n${challenge}\n\nBOUNDARY CONDITIONS:\n- Focus on mid-market enterprise executive champions.\n- Balance high-velocity connector distribution vs vertical proprietary moat.\n- Validate CAC payback within 90 days.`
      );
      setIsFramingReviewReady(true);
    } finally {
      setIsSynthesizingFraming(false);
    }
  };

  // Step 3: Approve Refined Statement & Convene Council
  const handleApproveAndConvene = (statementToRun: string) => {
    setActiveDilemma(statementToRun);
    setIsFramingActive(false);
    startCouncilDeliberation(statementToRun);
  };

  const startCouncilDeliberation = async (problemToSolve: string) => {
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
      // Stage 1: Divergence
      const s1Final = await executeStage1(problemToSolve, tier, auth, (index, updated) => {
        setStage1Results(prev => {
          const next = [...prev];
          next[index] = updated;
          return next;
        });
      });

      // Stage 2: War Room
      setCurrentStage(2);
      setActiveTab(2);

      const initialStage2: Stage2Response[] = currentModels.map(m => ({
        modelId: m.id,
        modelName: m.name,
        rawOutput: '',
        status: 'running'
      }));
      setStage2Results(initialStage2);

      const s2Final = await executeStage2(problemToSolve, s1Final, tier, auth, (index, updated) => {
        setStage2Results(prev => {
          const next = [...prev];
          next[index] = updated;
          return next;
        });
      });

      // Stage 3: Synthesis
      setCurrentStage(3);
      setActiveTab(3);

      const s3Final = await executeStage3(problemToSolve, s1Final, s2Final, tier, auth);
      setStage3Result(s3Final);

      refreshTokens();
    } catch (err: any) {
      setGeneralError(err.message || 'Deliberation error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f5] text-stone-900 flex flex-col font-sans selection:bg-amber-400 selection:text-stone-950">
      {/* Editorial Header */}
      <Header
        auth={auth}
        keyStatus={keyStatus}
        onRefreshKeyStatus={refreshTokens}
        isRefreshingKey={isRefreshingKey}
        onOpenSetup={() => setIsSetupOpen(true)}
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onReset={handleReset}
        isProcessing={isProcessing}
      />

      {/* Stepper & Live Council Chamber */}
      {currentStage > 0 && (
        <PipelineStepper
          currentStage={currentStage}
          tier={tier}
          isProcessing={isProcessing}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          canNavigateTabs={!isProcessing || currentStage === 3}
          remainingTokens={keyStatus.limit_remaining || 37.70}
        />
      )}

      {/* Main Workspace Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8">
        {/* Error Warning */}
        {generalError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start space-x-3 text-red-900 animate-fadeIn shadow-xs">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-xs sm:text-sm">
              <span className="font-bold">Council Notice: </span>
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

        {/* 1. Initial Hero & Dilemma Formulation (When Idle) */}
        {currentStage === 0 && !isFramingActive && (
          <InputSection
            challenge={challenge}
            setChallenge={setChallenge}
            tier={tier}
            setTier={setTier}
            onConvene={handleStartFraming}
            onOpenGuide={() => setIsGuideOpen(true)}
            isProcessing={isProcessing}
            canConvene={challenge.trim().length > 10}
          />
        )}

        {/* 2. Framing Agent Dialogue (P0 - Step 1 Before Council) */}
        {currentStage === 0 && isFramingActive && (
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6 animate-fadeIn">
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-3">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-900">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Step 1 of 2 • Framing Agent Dialogue</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                Clarifying Your Strategic Problem Statement
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                To prevent the Council from making hypothetical assumptions (the problem seen with tools like Mera.Work), our fast framing model extracts your exact decision boundaries.
              </p>
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-700 font-sans">
                <span className="font-semibold text-stone-900 font-mono text-[10px] uppercase block mb-1">Your Stated Challenge:</span>
                <p className="italic text-stone-800 line-clamp-3">"{challenge}"</p>
              </div>
            </div>

            {/* Questions View */}
            {!isFramingReviewReady && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-base text-stone-900">
                    Clarifying Questions from the Framing Agent:
                  </h3>
                  <p className="text-xs text-stone-500">
                    Brief bullet-point answers are sufficient to sharpen the council's focus.
                  </p>
                </div>

                <div className="space-y-4">
                  {framingQuestions.map((q, idx) => (
                    <div key={idx} className="space-y-1.5 p-4 bg-stone-50/70 border border-stone-200/80 rounded-2xl">
                      <label className="block text-xs font-bold text-stone-800 font-sans">
                        <span className="text-indigo-600 font-mono mr-1.5">Q{idx + 1}.</span>
                        {q}
                      </label>
                      <textarea
                        rows={2}
                        value={framingAnswers[idx] || ''}
                        onChange={e => setFramingAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                        placeholder="Provide specifics, stakeholder context, or boundary conditions..."
                        className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 font-sans"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => handleApproveAndConvene(challenge)}
                    className="text-xs text-stone-500 hover:text-stone-800 underline font-medium"
                  >
                    Skip framing and run council directly
                  </button>

                  <button
                    type="button"
                    onClick={handleSynthesizeFraming}
                    disabled={isSynthesizingFraming}
                    className="w-full sm:w-auto px-6 py-3 bg-stone-900 hover:bg-black text-white rounded-xl font-semibold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
                  >
                    {isSynthesizingFraming ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Synthesizing Refined Problem...</span>
                      </>
                    ) : (
                      <>
                        <span>Synthesize Refined Statement</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-300" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Review Statement View */}
            {isFramingReviewReady && (
              <div className="bg-white border border-amber-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      Refined Problem Statement (Ready for Deliberation)
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">
                    Framed
                  </span>
                </div>

                <textarea
                  rows={8}
                  value={refinedStatement}
                  onChange={e => setRefinedStatement(e.target.value)}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/40 font-sans leading-relaxed"
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setIsFramingReviewReady(false)}
                    className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center space-x-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                    <span>Re-answer Clarifying Questions</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApproveAndConvene(refinedStatement)}
                    className="w-full sm:w-auto px-7 py-3.5 bg-stone-900 hover:bg-black text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Approve & Convene Council</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. Live Deliberation Results (Stages 1, 2, 3) */}
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
                  {activeDilemma || challenge}
                </p>
              </div>

              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="self-start sm:self-auto px-4 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
                <span>New Dilemma</span>
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

      {/* Footer */}
      <Footer
        onOpenPortfolio={() => setIsPortfolioOpen(true)}
        onOpenSetup={() => setIsSetupOpen(true)}
        onOpenGuide={() => setIsGuideOpen(true)}
      />

      {/* Modals */}
      <SetupModal
        isOpen={isSetupOpen}
        onClose={() => setIsSetupOpen(false)}
        auth={auth}
        onSaveAuth={handleSaveAuth}
      />

      <PortfolioModal
        isOpen={isPortfolioOpen || isAboutOpen}
        onClose={() => {
          setIsPortfolioOpen(false);
          setIsAboutOpen(false);
        }}
        defaultTab={isAboutOpen ? 'about' : 'products'}
      />

      {/* Dedicated Help / How to Use (BYOK Guide) Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#faf9f5] border border-stone-200 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 sm:px-8 py-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center justify-center shadow-xs">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                    How to Use Nirmay (BYOK Guide)
                  </h2>
                  <p className="text-xs text-stone-500 font-sans">
                    Free, unlimited, private multi-agent deliberations with your own OpenRouter key
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsHelpOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-xs text-stone-700 font-sans">
              <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  Primary & Preferred Path
                </span>
                <h3 className="text-lg font-serif font-bold text-stone-900">
                  Use Nirmay for free with your own OpenRouter API key.
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-sans">
                  No payment to us. No login. No limits. Just bring your own key and start deliberating. All calls dispatch client-side directly from your browser to OpenRouter.
                </p>
              </div>

              <div className="space-y-3.5">
                <h4 className="font-serif font-bold text-base text-stone-900">5-Step Setup Guide</h4>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
                  <div className="font-bold text-stone-900">1. Sign up at OpenRouter</div>
                  <p className="text-stone-600">Go to <a href="https://openrouter.ai" target="_blank" rel="noreferrer" className="text-amber-800 underline font-medium">openrouter.ai</a> and create a free account.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
                  <div className="font-bold text-stone-900">2. Create an API Key</div>
                  <p className="text-stone-600">Go to <a href="https://openrouter.ai/settings/keys" target="_blank" rel="noreferrer" className="text-amber-800 underline font-medium">openrouter.ai/settings/keys</a>, click "Create key", and copy your secret key starting with <code className="font-mono bg-stone-100 px-1 py-0.5 rounded">sk-or-v1-…</code></p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
                  <div className="font-bold text-stone-900">3. Add Credits to OpenRouter</div>
                  <p className="text-stone-600">Go to <a href="https://openrouter.ai/credits" target="_blank" rel="noreferrer" className="text-amber-800 underline font-medium">openrouter.ai/credits</a> and add funds via credit card (even $5 goes a very long way).</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
                  <div className="font-bold text-stone-900">4. Paste Your Key into Nirmay</div>
                  <p className="text-stone-600">Click <strong>Settings</strong> in the navigation, choose <strong>Mode A: BYOK</strong>, paste your key, and click Save.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-1">
                  <div className="font-bold text-stone-900">5. Deliberate Freely</div>
                  <p className="text-stone-600">You pay OpenRouter directly at wholesale cost. Monitor your live remaining balance in the top-right widget.</p>
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="font-bold text-stone-900">Convenience Alternative: Pre-Paid Key</div>
                <p className="text-stone-600 leading-relaxed">
                  If you prefer not to manage OpenRouter billing, Rishi Roy can issue a child key with a spending limit equal to your payment via domestic UPI (<code className="font-mono">rishi.roy-1@okhdfcbank</code>) or international PayPal (<code className="font-mono">rishi.roy+paypalindia@gmail.com</code>).
                </p>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setIsHelpOpen(false);
                  setIsSetupOpen(true);
                }}
                className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center space-x-1.5"
              >
                <Key className="w-3.5 h-3.5 text-amber-300" />
                <span>Enter Key in Settings</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Council Architecture & Karpathy Guide Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#faf9f5] border border-stone-200 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
            <div className="px-6 sm:px-8 py-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
              <div className="flex items-center space-x-3.5">
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
                    Giving multiple independent models the architectural runway to think, critique each other, and reconcile disparate viewpoints unlocks true boardroom-level reasoning.
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 sm:px-8 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between">
              <div className="text-xs text-stone-500 font-sans">
                Academic Open Source • Demonstrated for IIM Nagpur
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
    </div>
  );
};

export default App;
