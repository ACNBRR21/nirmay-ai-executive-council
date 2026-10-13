import React, { useState } from 'react';
import { Stage3Response, CouncilTier } from '../types/council';
import { COUNCIL_TIERS } from '../services/api';
import { Crown, Copy, Check, Download, Printer, ShieldCheck, Loader2, ArrowUpRight, Award } from 'lucide-react';

interface SynthesisMemoProps {
  stage3Result?: Stage3Response;
  tier: CouncilTier;
  isProcessing: boolean;
  onReset: () => void;
}

export const SynthesisMemo: React.FC<SynthesisMemoProps> = ({
  stage3Result,
  tier,
  isProcessing,
  onReset
}) => {
  const config = COUNCIL_TIERS[tier];
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!stage3Result?.memoMarkdown) return;
    navigator.clipboard.writeText(stage3Result.memoMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!stage3Result?.memoMarkdown) return;
    const blob = new Blob([stage3Result.memoMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Nirmay_Executive_Decision_Memo_${new Date().toISOString().slice(0, 10)}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Chairman Synthesis Header Card */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 uppercase tracking-wider flex items-center space-x-1.5 font-mono">
                <Crown className="w-3.5 h-3.5 fill-current" />
                <span>Chairman Adjudication & Synthesis</span>
              </span>
              <span className="text-xs font-mono text-indigo-300 bg-indigo-950/60 px-2.5 py-0.5 rounded border border-indigo-800">
                {stage3Result?.chairmanModelName || config.chairmanName}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
              Executive Decision Memo & Strategic Mandate
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl font-sans leading-relaxed">
              Definitive strategic resolution synthesized from 4 divergent proposals and 4 adversarial red-team audits. Structured for Board of Directors and Executive Committee presentation.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center space-x-2.5 self-start md:self-auto">
            <button
              onClick={handleCopy}
              disabled={!stage3Result?.memoMarkdown}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center space-x-1.5 shadow-sm"
              title="Copy Memo Markdown"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy Memo'}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={!stage3Result?.memoMarkdown}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all flex items-center space-x-1.5 shadow-sm"
              title="Download Markdown Document"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button
              onClick={handlePrint}
              disabled={!stage3Result?.memoMarkdown}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-lg shadow-indigo-600/30"
              title="Print-Ready Board Presentation"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Rendered Memo Body */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl shadow-2xl p-6 sm:p-12 backdrop-blur-md">
        {isProcessing && !stage3Result?.memoMarkdown && (
          <div className="py-28 flex flex-col items-center justify-center text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 animate-pulse shadow-lg shadow-indigo-500/20">
              <Crown className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-lg font-serif font-bold text-white">
                Chairman {config.chairmanName} is Convening Synthesis...
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                Adjudicating peer audits, reconciling speed versus governance tensions, and formulating the 3-horizon execution blueprint.
              </p>
            </div>
            <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
          </div>
        )}

        {stage3Result?.memoMarkdown && (
          <article className="space-y-6">
            {/* Metadata Bar */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 font-mono">
              <div className="flex items-center space-x-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Audited Multi-Model Consensus: Board Presentation Standard</span>
              </div>
              <div>
                Duration: {((stage3Result.latencyMs || 0) / 1000).toFixed(1)}s • Total Token Load: ~{stage3Result.tokensUsed || 3200}
              </div>
            </div>

            {/* Markdown Text Body */}
            <div className="text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-sans space-y-4 prose prose-invert max-w-none">
              {stage3Result.memoMarkdown}
            </div>
          </article>
        )}

        {!isProcessing && !stage3Result?.memoMarkdown && (
          <div className="py-24 text-center text-xs text-slate-500">
            Awaiting Stage 1 and Stage 2 completion to generate the Chairman's Executive Decision Memo.
          </div>
        )}
      </div>

      {/* Re-Convene Button */}
      {stage3Result?.memoMarkdown && (
        <div className="flex justify-end pt-2">
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-xl border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-2"
          >
            <span>Convene Another Executive Council</span>
            <ArrowUpRight className="w-4 h-4 text-indigo-400" />
          </button>
        </div>
      )}
    </div>
  );
};
