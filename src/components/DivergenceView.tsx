import React, { useState } from 'react';
import { Stage1Response, CouncilTier } from '../types/council';
import { COUNCIL_TIERS } from '../services/api';
import { Loader2, AlertTriangle, Clock, Hash, Maximize2, Minimize2 } from 'lucide-react';

interface DivergenceViewProps {
  results: Stage1Response[];
  tier: CouncilTier;
  isProcessing: boolean;
}

export const DivergenceView: React.FC<DivergenceViewProps> = ({
  results,
  tier,
  isProcessing
}) => {
  const config = COUNCIL_TIERS[tier];
  const [selectedProposalIndex, setSelectedProposalIndex] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Banner */}
      <div className="crucible-card rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 font-mono uppercase tracking-wide">
                Stage 1 of 3 • Divergence
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                Independent Parallel Reasoning
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
              Four frontier foundation models independently dissect the executive dilemma without seeing each other's hypotheses.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs text-stone-500 font-mono bg-stone-50 px-3.5 py-2 rounded-xl border border-stone-200">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-stone-800 font-semibold">4 Parallel Pipelines</span>
            </span>
            <span className="text-stone-300">|</span>
            <span>Zero Cross-Pollination</span>
          </div>
        </div>
      </div>

      {/* Grid of 4 Proposals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {config.models.map((model, idx) => {
          const res = results[idx];
          const isModelProcessing = isProcessing && (!res || res.status === 'running' || res.status === 'pending');
          const isCompleted = res && res.status === 'completed';
          const isError = res && res.status === 'error';
          const proposalLabel = res?.label || `Proposal ${['Alpha', 'Beta', 'Gamma', 'Delta'][idx]}`;
          const isExpanded = selectedProposalIndex === idx;

          return (
            <div
              key={model.id}
              className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col shadow-sm ${
                isExpanded ? 'md:col-span-2 ring-2 ring-stone-400' : 'hover:border-stone-300'
              } ${
                isCompleted
                  ? 'border-stone-200'
                  : isModelProcessing
                  ? 'border-amber-300 bg-amber-50/20'
                  : 'border-stone-200'
              }`}
            >
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-stone-100 flex items-center justify-between bg-stone-50/60 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                    {['α', 'β', 'γ', 'δ'][idx]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-serif font-bold text-base text-stone-900">
                        {proposalLabel}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-stone-700 border border-stone-200">
                        {model.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-stone-500 font-sans">{model.shortDesc}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isModelProcessing && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-900 border border-amber-200">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Formulating...</span>
                    </span>
                  )}
                  {isCompleted && (
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-stone-500 hidden sm:inline-flex items-center space-x-1 bg-stone-100 px-2 py-1 rounded border border-stone-200">
                        <Clock className="w-3 h-3 text-stone-400" />
                        <span>{((res.latencyMs || 0) / 1000).toFixed(1)}s</span>
                      </span>
                      <button
                        onClick={() => setSelectedProposalIndex(isExpanded ? null : idx)}
                        className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-100 transition-colors"
                        title={isExpanded ? 'Collapse' : 'Expand full width'}
                      >
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                  {isError && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Failed</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 overflow-y-auto max-h-[460px]">
                {isModelProcessing && (
                  <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
                    <p className="text-sm font-semibold text-stone-800">
                      Consulting {model.name}...
                    </p>
                    <p className="text-xs text-stone-500 max-w-xs leading-relaxed">
                      Constructing first-principles thesis, financial unit economics, and non-negotiable 90-day milestones.
                    </p>
                  </div>
                )}

                {isCompleted && (
                  <div className="text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans space-y-3">
                    {res.rawOutput}
                  </div>
                )}

                {isError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-800 space-y-2">
                    <p className="font-bold">Advisor Consultation Interrupted</p>
                    <p className="text-red-700 leading-relaxed font-mono text-[11px]">
                      {res.error || res.rawOutput}
                    </p>
                  </div>
                )}

                {!res && !isModelProcessing && (
                  <div className="py-16 text-center text-xs text-stone-400">
                    Awaiting council convocation...
                  </div>
                )}
              </div>

              {/* Card Footer */}
              {isCompleted && (
                <div className="px-6 py-3 bg-stone-50 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between rounded-b-2xl font-mono">
                  <span className="flex items-center space-x-1.5 text-stone-600">
                    <Hash className="w-3.5 h-3.5 text-stone-400" />
                    <span>{res.tokensUsed ? `${res.tokensUsed} tokens` : 'Est. 1.8k tokens'}</span>
                  </span>
                  <span className="text-stone-400 font-serif italic">First-principles synthesis</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
