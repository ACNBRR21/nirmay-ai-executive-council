import React from 'react';
import { CouncilTier } from '../types/council';
import { COUNCIL_TIERS } from '../services/api';
import { Sparkles, ArrowRight, BookOpen, Zap, Crown, ShieldAlert } from 'lucide-react';

interface InputSectionProps {
  challenge: string;
  setChallenge: (val: string) => void;
  tier: CouncilTier;
  setTier: (t: CouncilTier) => void;
  onConvene: () => void;
  isProcessing: boolean;
  canConvene: boolean;
}

const SAMPLE_CHALLENGES = [
  {
    title: 'EV Battery Supply Chain Re-shoring ($1.8B Capex)',
    category: 'Supply Chain & Geopolitics',
    text: 'A multinational automotive OEM faces rising geopolitical risk and export restrictions on lithium-ion battery cells. Evaluate whether to invest $1.8B in a greenfield domestic Gigafactory, establish a joint venture with a tier-1 Asian supplier, or secure multi-source long-term supply agreements. Balance capital expenditure risk against 5-year supply assurance.'
  },
  {
    title: 'Enterprise SaaS GenAI Pivot ($85M ARR Margin Defense)',
    category: 'Software Strategy & Unit Economics',
    text: 'A high-growth enterprise CRM SaaS company ($85M ARR, 78% gross margin) is threatened by AI-native startups automating client reporting and prospecting. Should we rapidly integrate third-party frontier LLM APIs (risking margin degradation down to 55%), distill custom small models on proprietary interaction data, or acquire a vertical AI seed-stage startup?'
  },
  {
    title: 'Hospital Network Eye-Care AI Rollout (Nirmay.health Framework)',
    category: 'Healthcare Governance & Compliance',
    text: 'A tier-1 hospital network with 42 centers is deploying an AI diagnostic and eye-drop compliance tracking system (inspired by Nirmay.health). Clinicians express liability concerns, while IT flags HIPAA/DPDP data privacy compliance. Define the phased rollout strategy to secure physician adoption, institutional governance, and quantifiable patient outcome metrics.'
  }
];

export const InputSection: React.FC<InputSectionProps> = ({
  challenge,
  setChallenge,
  tier,
  setTier,
  onConvene,
  isProcessing,
  canConvene
}) => {
  const currentConfig = COUNCIL_TIERS[tier];

  return (
    <div className="bg-slate-900/70 backdrop-blur-xl rounded-2xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Subtle Ambient Radial Highlight */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header & Council Tier Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">
              Deliberation Mandate
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight mt-0.5">
            Strategic Problem Statement
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Input high-stakes executive dilemmas for 3-stage multi-model deliberation, red-team peer audits, and Chairman synthesis.
          </p>
        </div>

        {/* Tier Selector */}
        <div className="flex items-center space-x-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto shadow-inner">
          <button
            type="button"
            onClick={() => setTier('medium')}
            disabled={isProcessing}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              tier === 'medium'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Medium Council ($5)</span>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setTier('heavy')}
            disabled={isProcessing}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
              tier === 'heavy'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <Crown className="w-3.5 h-3.5" />
              <span>Heavy Frontier ($10)</span>
            </div>
          </button>
        </div>
      </div>

      {/* Model Roster Pill Display */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-4">
        <div className="flex items-center justify-between text-xs mb-3">
          <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px] font-mono">
            Council Deliberation Roster ({currentConfig.name}):
          </span>
          <span className="text-[11px] text-slate-400 font-serif italic">
            Chairman: <span className="font-bold text-indigo-300">{currentConfig.chairmanName}</span>
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {currentConfig.models.map(m => (
            <div
              key={m.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-lg p-2.5 flex flex-col justify-between transition-colors"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-white truncate">{m.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded border font-mono bg-slate-800 text-slate-300 border-slate-700">
                  {m.provider}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight truncate">{m.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Textarea */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
            Executive Dilemma & Boundary Conditions
          </label>
          <span className="text-xs text-slate-500 font-mono">
            {challenge.length} characters
          </span>
        </div>
        <textarea
          rows={5}
          value={challenge}
          onChange={e => setChallenge(e.target.value)}
          disabled={isProcessing}
          placeholder="State your strategic challenge in detail. Specify key trade-offs, capital or operational constraints, timeline, and risk appetite..."
          className="w-full p-4 text-sm text-slate-100 bg-slate-950/80 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all font-sans leading-relaxed resize-y placeholder:text-slate-600 shadow-inner"
        />
      </div>

      {/* Case Presets for IIM Exec Ed */}
      <div>
        <div className="flex items-center space-x-2 mb-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
          <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
          <span>IIM Executive Education Case Studies (Click to load):</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SAMPLE_CHALLENGES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isProcessing}
              onClick={() => setChallenge(sample.text)}
              className="text-left p-3.5 rounded-xl border border-slate-800/80 bg-slate-950/50 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group shadow-sm flex flex-col justify-between space-y-2"
            >
              <div>
                <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-indigo-400 mb-1 block">
                  {sample.category}
                </span>
                <div className="font-serif font-bold text-xs text-slate-200 group-hover:text-white leading-snug">
                  {sample.title}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                {sample.text}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Convene Button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800/60">
        <div className="text-xs text-slate-400 flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          <span>Pipeline: 4 Independent Divergent Memos → 4 Peer Cross-Critiques → Chairman Synthesis</span>
        </div>
        <button
          type="button"
          onClick={onConvene}
          disabled={!canConvene || isProcessing}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-xl flex items-center justify-center space-x-2.5 ${
            canConvene && !isProcessing
              ? 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 hover:from-indigo-500 hover:to-indigo-500 text-white shadow-indigo-600/30 hover:shadow-indigo-500/50 cursor-pointer scale-100 hover:scale-[1.02]'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed shadow-none'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-200" />
          <span>{isProcessing ? 'Deliberating in Council...' : 'Convene Executive Council'}</span>
          <ArrowRight className="w-4 h-4 text-indigo-200" />
        </button>
      </div>
    </div>
  );
};
