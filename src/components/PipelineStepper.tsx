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
      subtitle: '4 Independent Solutions',
      icon: GitFork
    },
    {
      index: 2,
      title: 'Stage 2: The War Room',
      subtitle: 'Blind Red-Team Audits',
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
                    <div className="text-[10px] text-stone-400 font-normal">
                      {step.subtitle}
                    </div>
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
  );
};
