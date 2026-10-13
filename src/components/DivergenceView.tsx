import React, { useState } from 'react';
import { Stage1Response, CouncilTier } from '../types/council';
import { COUNCIL_TIERS } from '../services/api';
import { Loader2, AlertTriangle, Clock, Hash, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';

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
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono uppercase tracking-wide">
                Stage 1 of 3 • Divergence
              </span>
              <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                Independent Parallel Reasoning
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              Four frontier foundation models independently dissect the executive challenge from first principles without cross-contamination or consensus pressure.
            </p>
          </div>
          <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono bg-slate-950/60 px-3.5 py-2 rounded-xl border border-slate-800">
            <span className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-slate-200">4 Parallel Pipelines</span>
            </span>
            <span className="text-slate-700">|</span>
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
              className={`bg-slate-900/70 backdrop-blur-xl rounded-2xl border transition-all duration-300 flex flex-col shadow-2xl relative ${
                isExpanded ? 'md:col-span-2 ring-2 ring-indigo-500/50' : ''
              } ${
                isCompleted
                  ? 'border-slate-800 hover:border-slate-700'
                  : isModelProcessing
                  ? 'border-indigo-500/40 bg-indigo-950/20'
                  : 'border-slate-800/80'
              }`}
            >
              {/* Card Header */}
              <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/50 rounded-t-2xl">
                <div className="flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-indigo-400 flex items-center justify-center font-serif text-sm font-bold shadow-md border border-slate-700">
                    {['α', 'β', 'γ', 'δ'][idx]}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-serif font-bold text-sm text-white">
                        {proposalLabel}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {model.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-sans">{model.shortDesc}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {isModelProcessing && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Formulating...</span>
                    </span>
                  )}
                  {isCompleted && (
                    <div className="flex items-center space-x-2">
                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline-flex items-center space-x-1 bg-slate-950/60 px-2 py-1 rounded border border-slate-800">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span>{((res.latencyMs || 0) / 1000).toFixed(1)}s</span>
                      </span>
                      <button
                        onClick={() => setSelectedProposalIndex(isExpanded ? null : idx)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                        title={isExpanded ? 'Collapse' : 'Expand full width'}
                      >
                        {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </button>
                    </div>
                  )}
                  {isError && (
                    <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded text-xs font-medium bg-red-950/50 text-red-400 border border-red-800">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Failed</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 overflow-y-auto max-h-[480px]">
                {isModelProcessing && (
                  <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
                    <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
                    <p className="text-sm font-semibold text-slate-200">
                      Consulting {model.name}...
                    </p>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      Constructing first-principles thesis, financial unit economics, and non-negotiable 90-day milestones.
                    </p>
                  </div>
                )}

                {isCompleted && (
                  <div className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans space-y-3 prose prose-invert max-w-none">
                    {res.rawOutput}
                  </div>
                )}

                {isError && (
                  <div className="p-4 bg-red-950/30 border border-red-800/80 rounded-xl text-xs text-red-300 space-y-2">
                    <p className="font-bold text-red-200">Advisor Consultation Failed</p>
                    <p className="text-red-400 leading-relaxed font-mono text-[11px]">
                      {res.error || res.rawOutput}
                    </p>
                  </div>
                )}

                {!res && !isModelProcessing && (
                  <div className="py-16 text-center text-xs text-slate-500">
                    Awaiting council convocation...
                  </div>
                )}
              </div>

              {/* Card Footer */}
              {isCompleted && (
                <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between rounded-b-2xl font-mono">
                  <span className="flex items-center space-x-1.5 text-slate-400">
                    <Hash className="w-3.5 h-3.5 text-slate-500" />
                    <span>{res.tokensUsed ? `${res.tokensUsed} tokens` : 'Est. 1.8k tokens'}</span>
                  </span>
                  <span className="text-indigo-400/80 font-serif italic">First-principles synthesis</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
