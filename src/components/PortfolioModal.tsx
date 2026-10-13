import React from 'react';
import { ExternalLink, Eye, Anchor, Sparkles, Shield, X } from 'lucide-react';

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
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Active Clinical Platform',
      description:
        'Intelligent eye-drop tracking and clinical compliance companion. Generates executive and physician-grade synopsis of ophthalmology reports, drops adherence analytics, and patient outcome predictions for hospital networks.'
    },
    {
      title: 'Anchor & Flow',
      category: 'Productivity & Cognitive Architecture',
      url: 'https://anchorandflow.com',
      icon: Anchor,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      badge: 'Executive Flow OS',
      description:
        'Cognitive state management and time orchestration suite designed for high-leverage founders and knowledge workers, harmonizing deep work cycles with automated asynchronous communication.'
    },
    {
      title: 'broccoberry.com',
      category: 'Consumer Intelligence & Health Tech',
      url: 'https://broccoberry.com',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      badge: 'Nutritional Intelligence',
      description:
        'Next-generation micronutrient intelligence and personalized dietary modeling, translating biomarker data into actionable longevity protocols.'
    },
    {
      title: 'nirmay.org',
      category: 'Open-Source Academic Research',
      url: 'https://nirmay.org',
      icon: Shield,
      color: 'bg-stone-100 text-stone-700 border-stone-200',
      badge: 'Research Foundation',
      description:
        'Open research repository exploring multi-agent LLM governance, consensus formation in distributed synthetic councils, and institutional decision frameworks.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#faf9f5] border border-stone-200 rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-white border-b border-stone-200/80 text-stone-900 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200 font-mono uppercase tracking-wider">
                Architect Portfolio
              </span>
              <span className="text-xs text-stone-500 font-mono">Rishi Roy</span>
            </div>
            <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
              Ecosystem Products & Academic Deployments
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-5">
          <div className="p-4 bg-white border border-stone-200 rounded-2xl text-xs text-stone-600 leading-relaxed shadow-sm">
            <span className="font-bold text-stone-900">About the Architecture: </span>
            This application is created by AI architect <strong>Rishi Roy</strong> in collaboration with <strong>Professor SomShekhar</strong> for demonstration in the <strong>Executive Education Program at IIM (Indian Institute of Management)</strong>. It encapsulates practical implementations of multi-agent LLM consensus algorithms, privacy-preserving client inference, and enterprise governance.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-9 h-9 rounded-xl ${p.color} border flex items-center justify-center shadow-xs`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-serif font-bold text-sm text-stone-900 leading-tight">
                            {p.title}
                          </div>
                          <span className="text-[10px] text-stone-400 font-sans">{p.category}</span>
                        </div>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded font-mono font-medium bg-stone-100 text-stone-600">
                        {p.badge}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <a
                    href={p.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors pt-2.5 border-t border-stone-100"
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
        <div className="px-6 sm:px-8 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between text-xs text-stone-500 font-mono">
          <div>Open Source Academic License • nirmay.org</div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-stone-900 text-white rounded-xl hover:bg-black font-semibold transition-colors"
          >
            Close Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
