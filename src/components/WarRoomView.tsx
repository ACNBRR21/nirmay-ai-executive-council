import React, { useState } from 'react';
import { Stage1Response, Stage2Response, CouncilTier } from '../types/council';
import { COUNCIL_TIERS } from '../services/api';
import { ShieldAlert, Crosshair, Loader2, Clock, CheckCircle2 } from 'lucide-react';

interface WarRoomViewProps {
  stage1Results: Stage1Response[];
  stage2Results: Stage2Response[];
  tier: CouncilTier;
  isProcessing: boolean;
}

export const WarRoomView: React.FC<WarRoomViewProps> = ({
  stage2Results,
  tier,
  isProcessing
}) => {
  const config = COUNCIL_TIERS[tier];
  const [selectedAuditorIndex, setSelectedAuditorIndex] = useState<number>(0);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Banner */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono uppercase tracking-wide">
                Stage 2 of 3 • The War Room
              </span>
              <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                Anonymized Red-Team Peer Review
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
              Model identities are stripped. Each proposal is blindly cross-examined by all four models to surface single points of failure, unit economic fragility, and hidden diamond insights.
            </p>
          </div>
          <div className="flex items-center space-x-2.5 bg-amber-950/30 border border-amber-500/20 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-300 font-mono">
            <Crosshair className="w-4 h-4 text-amber-400" />
            <span>Blind Cross-Audit Protocol</span>
          </div>
        </div>
      </div>

      {/* Auditor Model Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {config.models.map((model, idx) => {
          const res = stage2Results[idx];
          const isSelected = selectedAuditorIndex === idx;
          const isModelProcessing = isProcessing && (!res || res.status === 'running' || res.status === 'pending');
          const isDone = res && res.status === 'completed';

          return (
            <button
              key={model.id}
              onClick={() => setSelectedAuditorIndex(idx)}
              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-amber-500/80 bg-amber-950/20 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                  : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className="text-xs font-serif font-bold text-white">
                  Auditor {idx + 1}
                </span>
                {isModelProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                ) : isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <div className="text-[11px] font-mono text-slate-300 truncate">{model.name}</div>
              <div className="text-[9px] text-slate-500 uppercase tracking-tight mt-1 font-mono">
                {model.provider} Red-Team
              </div>
            </button>
          );
        })}
      </div>

      {/* Main War Room Audit Display */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        {/* Selected Auditor Header */}
        <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-md">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-sm text-white">
                  Audit Report from {config.models[selectedAuditorIndex]?.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Cross-Examining Alpha, Beta, Gamma, Delta
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Ruthless evaluation of blind spots, confirmation biases, and reconcileable advantages.
              </p>
            </div>
          </div>

          {stage2Results[selectedAuditorIndex]?.latencyMs && (
            <div className="text-xs font-mono text-slate-400 flex items-center space-x-1.5 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>{((stage2Results[selectedAuditorIndex].latencyMs || 0) / 1000).toFixed(1)}s duration</span>
            </div>
          )}
        </div>

        {/* Audit Content */}
        <div className="p-6 sm:p-8">
          {isProcessing && !stage2Results[selectedAuditorIndex]?.rawOutput && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-sm font-semibold text-white">
                Auditor {selectedAuditorIndex + 1} ({config.models[selectedAuditorIndex]?.name}) is stress-testing proposals...
              </p>
              <p className="text-xs text-slate-400 max-w-md">
                Deconstructing Proposals Alpha, Beta, Gamma, and Delta to identify unstated risks and economic fallacies.
              </p>
            </div>
          )}

          {stage2Results[selectedAuditorIndex]?.rawOutput && (
            <div className="text-slate-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans space-y-4 prose prose-invert max-w-none">
              {stage2Results[selectedAuditorIndex].rawOutput}
            </div>
          )}

          {!isProcessing && !stage2Results[selectedAuditorIndex]?.rawOutput && (
            <div className="py-20 text-center text-xs text-slate-500">
              Stage 2 audits will populate once Stage 1 proposals are generated.
            </div>
          )}
        </div>

        {/* Comparative Blind Map Footer */}
        <div className="px-6 py-3.5 bg-slate-950/60 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 font-mono">
          <span className="font-semibold text-slate-300">Auditing Protocol:</span>
          <div className="flex items-center space-x-3 text-[11px] text-slate-400">
            <span>1. Single Biggest Flaw per Proposal</span>
            <span className="text-slate-700">•</span>
            <span>2. High-Leverage Overlooked Insights</span>
            <span className="text-slate-700">•</span>
            <span>3. Reconciled Operational Synthesis</span>
          </div>
        </div>
      </div>
    </div>
  );
};
