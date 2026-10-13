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
      <div className="crucible-card rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200 font-mono uppercase tracking-wide">
                Stage 2 of 3 • The War Room
              </span>
              <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                Anonymized Red-Team Peer Review
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
              Model identities are stripped. Each proposal is blindly cross-examined by all four models to surface single points of failure, unit economic fragility, and hidden diamond insights.
            </p>
          </div>
          <div className="flex items-center space-x-2 bg-amber-50 border border-amber-200/80 px-3.5 py-2 rounded-xl text-xs font-medium text-amber-900 font-mono">
            <Crosshair className="w-4 h-4 text-amber-700" />
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
                  ? 'border-stone-900 bg-white shadow-sm ring-1 ring-stone-900'
                  : 'border-stone-200 bg-white/70 hover:border-stone-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className="text-xs font-serif font-bold text-stone-900">
                  Auditor {idx + 1}
                </span>
                {isModelProcessing ? (
                  <Loader2 className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                ) : isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-stone-300" />
                )}
              </div>
              <div className="text-[11px] font-mono text-stone-700 truncate">{model.name}</div>
              <div className="text-[9px] text-stone-400 uppercase tracking-tight mt-1 font-mono">
                {model.provider} Red-Team
              </div>
            </button>
          );
        })}
      </div>

      {/* Main War Room Audit Display */}
      <div className="bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden">
        {/* Selected Auditor Header */}
        <div className="px-6 py-4 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center shadow-sm">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-serif font-bold text-sm text-stone-900">
                  Audit Report from {config.models[selectedAuditorIndex]?.name}
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                  Cross-Examining Alpha, Beta, Gamma, Delta
                </span>
              </div>
              <p className="text-[11px] text-stone-500 mt-0.5">
                Ruthless evaluation of blind spots, confirmation biases, and reconcileable advantages.
              </p>
            </div>
          </div>

          {stage2Results[selectedAuditorIndex]?.latencyMs && (
            <div className="text-xs font-mono text-stone-500 flex items-center space-x-1.5 bg-white px-2.5 py-1 rounded-lg border border-stone-200">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>{((stage2Results[selectedAuditorIndex].latencyMs || 0) / 1000).toFixed(1)}s duration</span>
            </div>
          )}
        </div>

        {/* Audit Content */}
        <div className="p-6 sm:p-8">
          {isProcessing && !stage2Results[selectedAuditorIndex]?.rawOutput && (
            <div className="py-20 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-8 h-8 text-amber-600 animate-spin" />
              <p className="text-sm font-semibold text-stone-800">
                Auditor {selectedAuditorIndex + 1} ({config.models[selectedAuditorIndex]?.name}) is stress-testing proposals...
              </p>
              <p className="text-xs text-stone-400 max-w-md">
                Deconstructing Proposals Alpha, Beta, Gamma, and Delta to identify unstated risks and economic fallacies.
              </p>
            </div>
          )}

          {stage2Results[selectedAuditorIndex]?.rawOutput && (
            <div className="text-stone-800 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans space-y-4">
              {stage2Results[selectedAuditorIndex].rawOutput}
            </div>
          )}

          {!isProcessing && !stage2Results[selectedAuditorIndex]?.rawOutput && (
            <div className="py-20 text-center text-xs text-stone-400">
              Stage 2 audits will populate once Stage 1 proposals are generated.
            </div>
          )}
        </div>

        {/* Footer Protocol */}
        <div className="px-6 py-3.5 bg-stone-50 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 font-mono">
          <span className="font-semibold text-stone-700">Auditing Protocol:</span>
          <div className="flex items-center space-x-3 text-[11px] text-stone-500">
            <span>1. Single Biggest Flaw per Proposal</span>
            <span className="text-stone-300">•</span>
            <span>2. High-Leverage Overlooked Insights</span>
            <span className="text-stone-300">•</span>
            <span>3. Reconciled Operational Synthesis</span>
          </div>
        </div>
      </div>
    </div>
  );
};
