import React, { useState } from 'react';
import { CouncilTier } from '../types/council';
import { COUNCIL_TIERS } from '../services/api';
import { Sparkles, ArrowRight, Wand2, Zap, Crown, ArrowUpRight, X, BookOpen, Layers } from 'lucide-react';

interface InputSectionProps {
  challenge: string;
  setChallenge: (val: string) => void;
  tier: CouncilTier;
  setTier: (t: CouncilTier) => void;
  onConvene: () => void;
  onOpenGuide: () => void;
  isProcessing: boolean;
  canConvene: boolean;
}

const SAMPLE_CHALLENGES = [
  {
    title: 'EV Battery Supply Chain Re-shoring ($1.8B Capex)',
    short: '🔋 EV Battery Supply Chain',
    category: 'Supply Chain & Geopolitics',
    text: 'A multinational automotive OEM faces rising geopolitical risk and export restrictions on lithium-ion battery cells. Evaluate whether to invest $1.8B in a greenfield domestic Gigafactory, establish a joint venture with a tier-1 Asian supplier, or secure multi-source long-term supply agreements. Balance capital expenditure risk against 5-year supply assurance.'
  },
  {
    title: 'Enterprise SaaS GenAI Pivot ($85M ARR Margin Defense)',
    short: '⚡ SaaS GenAI Pivot & Margins',
    category: 'Software Strategy & Unit Economics',
    text: 'A high-growth enterprise CRM SaaS company ($85M ARR, 78% gross margin) is threatened by AI-native startups automating client reporting and prospecting. Should we rapidly integrate third-party frontier LLM APIs (risking margin degradation down to 55%), distill custom small models on proprietary interaction data, or acquire a vertical AI seed-stage startup?'
  },
  {
    title: 'Hospital Network Eye-Care AI Rollout (Nirmay.health Framework)',
    short: '👁️ Hospital Network AI (Nirmay.health)',
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
  onOpenGuide,
  isProcessing,
  canConvene
}) => {
  const currentConfig = COUNCIL_TIERS[tier];
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardDilemma, setWizardDilemma] = useState('');
  const [wizardScale, setWizardScale] = useState('');
  const [wizardConstraints, setWizardConstraints] = useState('');
  const [wizardKillCriteria, setWizardKillCriteria] = useState('');

  const wizardTemplates = [
    {
      label: 'Build vs Buy Platform Architecture',
      dilemma: 'Deciding whether to build proprietary in-house machine learning infrastructure or partner with third-party foundation model APIs.',
      scale: '$8M annual engineering budget, 14-month delivery target.',
      constraints: 'Customer data privacy (SOC2 / GDPR) and switching costs.',
      killCriteria: 'Gross margin dropping below 65% due to third-party inference compute bills.'
    },
    {
      label: 'Market Entry & Expansion',
      dilemma: 'Expanding enterprise B2B sales into the Southeast Asian market versus deepening market share in domestic accounts.',
      scale: '$15M growth capital allocation over 2 years.',
      constraints: 'Local regulatory compliance, localized support SLAs, and executive bandwidth dilution.',
      killCriteria: 'Customer Acquisition Cost (CAC) payback period exceeding 14 months.'
    },
    {
      label: 'Clinical Diagnostic AI Integration',
      dilemma: 'Rolling out autonomous AI screening and patient compliance monitoring across hospital partner networks.',
      scale: '35 hospital centers, 120,000 monthly active patients.',
      constraints: 'Physician legal liability fears, EHR integration bottlenecks, HIPAA/DPDP data governance.',
      killCriteria: 'Physician adoption drops below 40% due to diagnostic alert fatigue.'
    }
  ];

  const handleApplyWizard = () => {
    const compiled = `STRATEGIC DECISION MANDATE:
${wizardDilemma || 'Evaluate the optimal capital and operational path forward.'}

OPERATIONAL & CAPITAL SCALE:
${wizardScale || 'Mid-market to enterprise scale, 12–24 month execution horizon.'}

KEY TENSIONS & STRUCTURAL CONSTRAINTS:
${wizardConstraints || 'Balance distribution velocity against long-term architectural defensibility and governance.'}

NON-NEGOTIABLE KILL-CRITERIA & DOWNSIDE BOUNDARIES:
${wizardKillCriteria || 'Preserve gross unit economics and avoid platform commoditization.'}

COUNCIL DELIBERATION OBJECTIVE:
Provide a rigorous first-principles resolution. Reconcile trade-offs, state non-hedged thesis, establish 90-day execution milestones, and define the board-level decision framework.`;

    setChallenge(compiled);
    setIsWizardOpen(false);
  };

  return (
    <div className="relative pt-4 sm:pt-8 pb-16 space-y-12">
      {/* Ambient Top Glow (Crucible Style) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 crucible-glow pointer-events-none -z-10"></div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-xs text-xs text-amber-900 font-medium">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
          <span>The Multi-Agent Council Pattern • Inspired by Andrej Karpathy's System 2 Research</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-stone-900 tracking-tight leading-[1.12]">
          The reasoning council built for what matters.
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-sans leading-relaxed">
          Single LLMs suffer from sycophancy and agree too easily. Nirmay convenes four independent frontier models, executes blind peer cross-examination, and synthesizes a definitive Executive Decision Memo.
        </p>
      </div>

      {/* Main Crucible-Style Floating Input Card */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="crucible-input-card rounded-2xl p-4 sm:p-5 transition-all focus-within:ring-2 focus-within:ring-stone-400 focus-within:border-stone-400">
          <div className="relative">
            <textarea
              rows={4}
              value={challenge}
              onChange={e => setChallenge(e.target.value)}
              disabled={isProcessing}
              placeholder="State your strategic challenge in detail, or click 'Guide Me' to formulate one..."
              className="w-full bg-transparent text-stone-900 placeholder:text-stone-400 text-sm sm:text-base focus:outline-none resize-none leading-relaxed font-sans"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 mt-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsWizardOpen(true)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors"
                title="Open the interactive wizard to frame a structured executive dilemma"
              >
                <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>Guide Me: Frame Dilemma</span>
              </button>

              <div className="flex items-center space-x-1 bg-stone-100 p-0.5 rounded-lg border border-stone-200">
                <button
                  type="button"
                  onClick={() => setTier('medium')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    tier === 'medium'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-amber-600" />
                    <span>Medium ($2 / $5)</span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setTier('heavy')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                    tier === 'heavy'
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  <span className="flex items-center space-x-1">
                    <Crown className="w-3 h-3 text-amber-600" />
                    <span>Heavy ($10)</span>
                  </span>
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={onConvene}
              disabled={!canConvene || isProcessing}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center space-x-2 ${
                canConvene && !isProcessing
                  ? 'bg-stone-900 hover:bg-black text-white shadow-md shadow-stone-900/10 cursor-pointer'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed shadow-none'
              }`}
            >
              <span>{isProcessing ? 'Convening...' : 'Convene Council'}</span>
              <ArrowRight className="w-4 h-4 text-stone-300" />
            </button>
          </div>
        </div>

        {/* Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          <span className="text-stone-400 font-mono text-[11px]">Example Cases:</span>
          {SAMPLE_CHALLENGES.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setChallenge(sample.text)}
              className="px-3 py-1.5 rounded-full border border-stone-200/90 bg-white/90 hover:bg-stone-50 text-stone-700 hover:text-stone-900 font-medium transition-all shadow-xs"
            >
              {sample.short}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsWizardOpen(true)}
            className="px-3 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100 text-indigo-900 font-semibold transition-all flex items-center space-x-1"
          >
            <Sparkles className="w-3 h-3 text-indigo-600" />
            <span>+ Build Custom Dilemma</span>
          </button>
        </div>
      </div>

      {/* Model Roster Preview Card */}
      <div className="max-w-3xl mx-auto px-4">
        <div className="crucible-card rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px] font-mono">
              Active Deliberation Roster ({currentConfig.name}):
            </span>
            <span className="text-[11px] text-stone-500 font-serif italic">
              Chairman: <strong className="text-stone-900">{currentConfig.chairmanName}</strong>
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {currentConfig.models.map(m => (
              <div
                key={m.id}
                className="bg-white border border-stone-200/80 rounded-xl p-3 flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-bold text-xs text-stone-900 truncate">{m.name}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded font-mono bg-stone-100 text-stone-600 border border-stone-200">
                    {m.provider}
                  </span>
                </div>
                <p className="text-[10px] text-stone-500 leading-tight truncate">{m.shortDesc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Two Ways to Solve / Two Feature Columns */}
      <div className="max-w-5xl mx-auto px-4 pt-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            One problem. Two ways to solve it.
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Compare single-model output with synthetic multi-agent council deliberation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="crucible-card rounded-2xl p-6 sm:p-7 space-y-4 border-stone-200">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
                Single LLM Generation
              </span>
              <span className="text-xs text-stone-400 font-serif italic">The Yes-Man Problem</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Sycophantic & Over-Confident
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Standard LLMs are trained via RLHF to please the user. When asked about a risky executive initiative, single models say <em className="text-stone-800 font-serif">"Yes, that's a great idea!"</em> and generate plausible-sounding justifications without testing fatal failure modes or black swan unit economics.
            </p>
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1 font-mono">
              <div className="text-rose-700 font-bold">❌ Confirmation Bias Trap</div>
              <div className="text-stone-500 text-[11px]">Hedges conclusions, hides fragility, zero cross-examination.</div>
            </div>
          </div>

          <div className="crucible-card rounded-2xl p-6 sm:p-7 space-y-4 border-amber-200/80 bg-gradient-to-br from-white via-amber-50/20 to-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200">
                Multi-Agent Council
              </span>
              <span className="text-xs text-stone-400 font-serif italic">System 2 Deliberation</span>
            </div>
            <h3 className="text-lg font-serif font-bold text-stone-900">
              Adversarial Peer Review & Synthesis
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              Nirmay executes a 3-stage consensus pipeline: 4 models formulate non-hedged solutions in parallel, model identities are stripped, and all 4 models audit each other’s work to isolate logical fallacies before an appointed Chairman delivers the definitive decision memo.
            </p>
            <div className="p-3.5 bg-amber-50/80 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1 font-mono">
              <div className="text-amber-800 font-bold">✓ 3-Stage Deliberation Engine</div>
              <div className="text-stone-600 text-[11px]">Divergence → Anonymized Peer Red-Teaming → Chairman Verdict.</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onOpenGuide}
            className="inline-flex items-center space-x-2 text-xs font-semibold text-stone-700 hover:text-amber-800 transition-colors"
          >
            <span>Read the full architecture guide & Andrej Karpathy's System 2 thesis</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
          </button>
        </div>
      </div>

      {/* Guided Dilemma Architect Modal */}
      {isWizardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl border border-stone-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-6 py-5 border-b border-stone-100 bg-[#faf9f5] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 flex items-center justify-center shadow-xs">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-serif font-bold text-stone-900 tracking-tight">
                    Guided Dilemma Architect
                  </h2>
                  <p className="text-xs text-stone-500 font-sans">
                    Formulate high-stakes strategic challenges for multi-agent council deliberation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWizardOpen(false)}
                className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              <div>
                <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 font-mono flex items-center justify-between">
                  <span>Quick Framework Templates:</span>
                  <span className="text-stone-400 text-[10px]">Click to pre-fill</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {wizardTemplates.map((tpl, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => {
                        setWizardDilemma(tpl.dilemma);
                        setWizardScale(tpl.scale);
                        setWizardConstraints(tpl.constraints);
                        setWizardKillCriteria(tpl.killCriteria);
                      }}
                      className="p-2.5 rounded-xl border border-stone-200 bg-stone-50 hover:bg-indigo-50/50 hover:border-indigo-300 text-left transition-all"
                    >
                      <div className="font-semibold text-xs text-stone-800">{tpl.label}</div>
                      <div className="text-[10px] text-stone-500 line-clamp-1 mt-0.5">{tpl.scale}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-mono">
                  1. The Core Strategic Fork in the Road
                </label>
                <textarea
                  rows={2}
                  value={wizardDilemma}
                  onChange={e => setWizardDilemma(e.target.value)}
                  placeholder="e.g. Build in-house SLMs vs integrate third-party frontier APIs; Greenfield Gigafactory vs Joint Venture..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-mono">
                  2. Scale, Capital Stakes & Horizon
                </label>
                <input
                  type="text"
                  value={wizardScale}
                  onChange={e => setWizardScale(e.target.value)}
                  placeholder="e.g. $1.8B Capex, 5-year supply agreement, 42 hospital centers, $85M ARR company..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-mono">
                  3. Structural Tensions & Boundary Conditions
                </label>
                <input
                  type="text"
                  value={wizardConstraints}
                  onChange={e => setWizardConstraints(e.target.value)}
                  placeholder="e.g. Speed to market vs HIPAA compliance; Capex exposure vs supply chain sovereignty..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-mono">
                  4. Existential Red Flags / Failure Modes to Avoid
                </label>
                <input
                  type="text"
                  value={wizardKillCriteria}
                  onChange={e => setWizardKillCriteria(e.target.value)}
                  placeholder="e.g. Gross margin erosion below 55%, platform commoditization by foundation models..."
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
                />
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-100 bg-[#faf9f5] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsWizardOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyWizard}
                disabled={!wizardDilemma.trim() && !wizardScale.trim()}
                className="px-5 py-2.5 bg-stone-900 hover:bg-black text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Inject Into Council Workspace</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
