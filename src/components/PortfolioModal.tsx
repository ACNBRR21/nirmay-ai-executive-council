import React from 'react';
import { ExternalLink, Eye, Anchor, Sparkles, Shield } from 'lucide-react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const products = [
    {
      title: 'Nirmay.health',
      category: 'Healthcare AI & Clinical Adherence',
      url: 'https://nirmay.health',
      icon: Eye,
      color: 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30',
      badge: 'Active Clinical Platform',
      description:
        'Intelligent eye-drop tracking and clinical compliance companion. Generates executive and physician-grade synopsis of ophthalmology reports, drops adherence analytics, and patient outcome predictions for hospital networks.'
    },
    {
      title: 'Anchor & Flow',
      category: 'Productivity & Cognitive Architecture',
      url: 'https://anchorandflow.com',
      icon: Anchor,
      color: 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30',
      badge: 'Executive Flow OS',
      description:
        'Cognitive state management and time orchestration suite designed for high-leverage founders and knowledge workers, harmonizing deep work cycles with automated asynchronous communication.'
    },
    {
      title: 'broccoberry.com',
      category: 'Consumer Intelligence & Health Tech',
      url: 'https://broccoberry.com',
      icon: Sparkles,
      color: 'bg-purple-600/20 text-purple-400 border border-purple-500/30',
      badge: 'Nutritional Intelligence',
      description:
        'Next-generation micronutrient intelligence and personalized dietary modeling, translating biomarker data into actionable longevity protocols.'
    },
    {
      title: 'nirmay.org',
      category: 'Open-Source Academic Research',
      url: 'https://nirmay.org',
      icon: Shield,
      color: 'bg-slate-800 text-slate-300 border border-slate-700',
      badge: 'Research Foundation',
      description:
        'Open research repository exploring multi-agent LLM governance, consensus formation in distributed synthetic councils, and institutional decision frameworks.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-950/80 border-b border-slate-800 text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono uppercase tracking-wider">
                Architect Portfolio
              </span>
              <span className="text-xs text-slate-400 font-mono">Rishi Roy</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-white tracking-tight">
              Ecosystem Products & Academic Deployments
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 leading-relaxed">
            <span className="font-bold text-white">About the Architecture: </span>
            This application is created by AI architect <strong>Rishi Roy</strong> in collaboration with <strong>Professor SomShekhar</strong> for demonstration in the <strong>Executive Education Program at IIM (Indian Institute of Management)</strong>. It encapsulates practical implementations of multi-agent LLM consensus algorithms, privacy-preserving client inference, and enterprise governance.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-950/70 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-xl ${p.color} flex items-center justify-center shadow-sm`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-serif font-bold text-sm text-white leading-tight">
                            {p.title}
                          </div>
                          <span className="text-[10px] text-slate-400 font-sans">{p.category}</span>
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded font-mono font-medium bg-slate-800 text-slate-300 border border-slate-700">
                        {p.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors pt-2.5 border-t border-slate-800/80"
                  >
                    <span>Visit {p.title}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-500 font-mono">
          <div>Open Source Academic License • nirmay.org</div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 font-medium transition-colors"
          >
            Close Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
