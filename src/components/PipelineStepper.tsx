import React from 'react';
import { CouncilTier } from '../types/council';
import { COUNCIL_TIERS } from '../services/api';
import { Crown, Loader2, GitFork, ShieldAlert, FileText, CheckCircle2, ArrowRight } from 'lucide-react';

interface PipelineStepperProps {
  currentStage: 0 | 1 | 2 | 3;
  tier: CouncilTier;
  isProcessing: boolean;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  canNavigateTabs: boolean;
  remainingTokens?: number;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  currentStage,
  tier,
  isProcessing,
  activeTab,
  setActiveTab,
  canNavigateTabs,
  remainingTokens = 37.70
}) => {
  const config = COUNCIL_TIERS[tier];
  const models = config.models;

  const steps = [
    { index: 1, title: 'Stage 1: Divergence', subtitle: '4 Independent Solutions', icon: GitFork },
    { index: 2, title: 'Stage 2: The War Room', subtitle: 'Blind Red-Team Audits', icon: ShieldAlert },
    { index: 3, title: 'Stage 3: Executive Synthesis', subtitle: 'Chairman Decision Memo', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Top Stepper Bar */}
      <div className="bg-white border-b border-stone-200 py-3.5 px-4 sm:px-6 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-stone-500 uppercase tracking-wider font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Deliberation Pipeline:</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-between sm:justify-start">
            {steps.map((step, idx) => {
              const isCurrent = currentStage === step.index && isProcessing;
              const isPast = currentStage > step.index || (currentStage === 3 && !isProcessing);
              const isSelected = activeTab === step.index;
              const isClickable = canNavigateTabs || currentStage >= step.index;

              return (
                <React.Fragment key={step.index}>
                  <button
                    disabled={!isClickable}
                    onClick={() => isClickable && setActiveTab(step.index)}
                    className={`flex items-center space-x-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-amber-100/70 border border-amber-300 text-stone-900 font-semibold shadow-xs'
                        : isClickable
                        ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 border border-transparent'
                        : 'text-stone-300 cursor-not-allowed border border-transparent'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                        isCurrent
                          ? 'bg-stone-900 text-amber-300 animate-pulse shadow-sm'
                          : isPast
                          ? 'bg-emerald-100 text-emerald-800'
                          : isSelected
                          ? 'bg-amber-200 text-stone-900'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      {isCurrent ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : isPast ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        step.index
                      )}
                    </div>
                    <div className="text-left hidden md:block">
                      <div className="leading-tight text-stone-800">{step.title}</div>
                      <div className="text-[10px] text-stone-400 font-normal">{step.subtitle}</div>
                    </div>
                  </button>

                  {idx < steps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-stone-300 hidden sm:block" />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Animated Council Chamber Graphic (Visible during active deliberation) */}
      {isProcessing && (
        <div className="bg-white border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-4xl mx-auto animate-fadeIn">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-stone-100">
            <div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-900">
                  Live Council Chamber In Session
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
                {currentStage === 1 && "Stage 1: Divergent Independent Generation"}
                {currentStage === 2 && "Stage 2: The War Room (Adversarial Peer Red-Teaming)"}
                {currentStage === 3 && "Stage 3: Chairman Synthesis & Executive Verdict"}
              </h3>
            </div>

            <div className="flex items-center space-x-3 text-xs font-mono bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200 self-start sm:self-auto">
              <div>
                <span className="text-stone-400">Key Balance: </span>
                <span className="font-bold text-emerald-700">${remainingTokens.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="relative py-10 flex items-center justify-center">
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-dashed border-stone-300/80 flex items-center justify-center relative">
              {/* Central Chairman */}
              <div
                className={`w-28 h-28 rounded-2xl flex flex-col items-center justify-center text-center p-2 transition-all duration-700 z-10 shadow-lg ${
                  currentStage === 3
                    ? 'bg-stone-900 text-amber-300 ring-4 ring-amber-400/40 scale-105'
                    : 'bg-stone-100 text-stone-700 border border-stone-200'
                }`}
              >
                <Crown className={`w-5 h-5 mb-1 ${currentStage === 3 ? 'text-amber-400 animate-bounce' : 'text-stone-400'}`} />
                <div className="font-serif font-bold text-xs leading-tight">Chairman</div>
                <div className="font-mono text-[9px] opacity-80 truncate max-w-full px-1">{config.chairmanName}</div>
                {currentStage === 3 && (
                  <span className="text-[9px] font-mono text-amber-400 flex items-center space-x-1 mt-1">
                    <Loader2 className="w-2.5 h-2.5 animate-spin" />
                    <span>Synthesizing...</span>
                  </span>
                )}
              </div>

              {/* Model 1: Top */}
              <div
                className={`absolute -top-5 left-1/2 -translate-x-1/2 w-32 p-2 rounded-xl text-center border shadow-xs transition-all duration-500 ${
                  currentStage === 1
                    ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-400/30 scale-105'
                    : currentStage === 2
                    ? 'bg-white border-amber-400 ring-1 ring-amber-400'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="font-bold text-xs text-stone-900 truncate">{models[0]?.name}</div>
                <div className="text-[9px] font-mono text-stone-500">{models[0]?.provider}</div>
                {currentStage === 1 && <span className="text-[9px] font-mono text-amber-700">Diverging...</span>}
                {currentStage === 2 && <span className="text-[9px] font-mono text-amber-800">Cross-Auditing →</span>}
              </div>

              {/* Model 2: Right */}
              <div
                className={`absolute top-1/2 -right-12 -translate-y-1/2 w-32 p-2 rounded-xl text-center border shadow-xs transition-all duration-500 ${
                  currentStage === 1
                    ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/30 scale-105'
                    : currentStage === 2
                    ? 'bg-white border-emerald-400 ring-1 ring-emerald-400'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="font-bold text-xs text-stone-900 truncate">{models[1]?.name}</div>
                <div className="text-[9px] font-mono text-stone-500">{models[1]?.provider}</div>
                {currentStage === 1 && <span className="text-[9px] font-mono text-emerald-700">Diverging...</span>}
                {currentStage === 2 && <span className="text-[9px] font-mono text-emerald-800">← Red-Teaming</span>}
              </div>

              {/* Model 3: Bottom */}
              <div
                className={`absolute -bottom-5 left-1/2 -translate-x-1/2 w-32 p-2 rounded-xl text-center border shadow-xs transition-all duration-500 ${
                  currentStage === 1
                    ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-400/30 scale-105'
                    : currentStage === 2
                    ? 'bg-white border-blue-400 ring-1 ring-blue-400'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="font-bold text-xs text-stone-900 truncate">{models[2]?.name}</div>
                <div className="text-[9px] font-mono text-stone-500">{models[2]?.provider}</div>
                {currentStage === 1 && <span className="text-[9px] font-mono text-blue-700">Diverging...</span>}
                {currentStage === 2 && <span className="text-[9px] font-mono text-blue-800">Auditing Fallacies</span>}
              </div>

              {/* Model 4: Left */}
              <div
                className={`absolute top-1/2 -left-12 -translate-y-1/2 w-32 p-2 rounded-xl text-center border shadow-xs transition-all duration-500 ${
                  currentStage === 1
                    ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-400/30 scale-105'
                    : currentStage === 2
                    ? 'bg-white border-purple-400 ring-1 ring-purple-400'
                    : 'bg-white border-stone-200'
                }`}
              >
                <div className="font-bold text-xs text-stone-900 truncate">{models[3]?.name}</div>
                <div className="text-[9px] font-mono text-stone-500">{models[3]?.provider}</div>
                {currentStage === 1 && <span className="text-[9px] font-mono text-purple-700">Diverging...</span>}
                {currentStage === 2 && <span className="text-[9px] font-mono text-purple-800">Peer Critique ↔</span>}
              </div>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-center space-y-1">
            <div className="font-serif font-bold text-sm text-stone-900">
              {currentStage === 1 && "Council members are generating independent, non-hedged perspectives in parallel..."}
              {currentStage === 2 && "Anonymized Peer Review: Models are blindly cross-examining Proposals Alpha, Beta, Gamma, and Delta..."}
              {currentStage === 3 && "Chairman is adjudicating disputes, reconciling speed vs governance, and drafting the Executive Decision Memo..."}
            </div>
            <p className="text-xs text-stone-500 font-sans">
              Deliberate System 2 reasoning ensures no single-model sycophancy or unexamined failure modes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
