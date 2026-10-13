import React from 'react';
import { GitFork, ShieldAlert, FileText, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

interface PipelineStepperProps {
  currentStage: 0 | 1 | 2 | 3;
  isProcessing: boolean;
  activeTab: number;
  setActiveTab: (tab: number) => void;
  canNavigateTabs: boolean;
}

export const PipelineStepper: React.FC<PipelineStepperProps> = ({
  currentStage,
  isProcessing,
  activeTab,
  setActiveTab,
  canNavigateTabs
}) => {
  const steps = [
    {
      index: 1,
      title: 'Stage 1: Divergence',
      subtitle: '4 Models Independent Solutions',
      icon: GitFork
    },
    {
      index: 2,
      title: 'Stage 2: The War Room',
      subtitle: 'Anonymized Peer Red-Teaming',
      icon: ShieldAlert
    },
    {
      index: 3,
      title: 'Stage 3: Executive Synthesis',
      subtitle: 'Chairman Decision Memo',
      icon: FileText
    }
  ];

  return (
    <div className="bg-slate-950/70 border-b border-slate-800/80 py-3.5 px-4 sm:px-6 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>Council Reasoning Pipeline:</span>
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
                      ? 'bg-indigo-600/20 border border-indigo-500/40 text-white font-semibold shadow-lg shadow-indigo-500/10'
                      : isClickable
                      ? 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
                      : 'text-slate-600 cursor-not-allowed border border-transparent'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold ${
                      isCurrent
                        ? 'bg-indigo-600 text-white animate-pulse shadow-md shadow-indigo-600/50'
                        : isPast
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : isSelected
                        ? 'bg-indigo-500/30 text-indigo-300'
                        : 'bg-slate-800 text-slate-500'
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
                    <div className="leading-tight text-slate-200">{step.title}</div>
                    <div className="text-[10px] text-slate-500 font-normal">
                      {step.subtitle}
                    </div>
                  </div>
                </button>

                {idx < steps.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-slate-700 hidden sm:block" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
