import React, { useState } from 'react';
import { X, ExternalLink, Linkedin, GraduationCap, Sparkles, Eye, Anchor } from 'lucide-react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'about' | 'products';
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onClose, defaultTab = 'about' }) => {
  const [activeTab, setActiveTab] = useState<'about' | 'products'>(defaultTab);

  if (!isOpen) return null;

  const products = [
    {
      title: 'Nirmay.health',
      category: 'Healthcare AI & Clinical Adherence',
      url: 'https://nirmay.health',
      icon: Eye,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      badge: 'Active Clinical Platform',
      description: 'Intelligent eye-drop tracking and clinical compliance companion. Generates executive and physician-grade synopsis of ophthalmology reports, drops adherence analytics, and patient outcome predictions for hospital networks.'
    },
    {
      title: 'Anchor & Flow',
      category: 'Productivity & Cognitive Architecture',
      url: 'https://anchorandflow.com',
      icon: Anchor,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      badge: 'Executive Flow OS',
      description: 'Cognitive state management and time orchestration suite designed for high-leverage founders and knowledge workers, harmonizing deep work cycles with automated asynchronous communication.'
    },
    {
      title: 'broccoberry.com',
      category: 'Consumer Intelligence & Health Tech',
      url: 'https://broccoberry.com',
      icon: Sparkles,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      badge: 'Nutritional Intelligence',
      description: 'Next-generation micronutrient intelligence and personalized dietary modeling, translating biomarker data into actionable longevity protocols.'
    },
    {
      title: 'nirmay.org',
      category: 'Open-Source Academic Research',
      url: 'https://nirmay.org',
      icon: Sparkles,
      color: 'bg-stone-100 text-stone-700 border-stone-200',
      badge: 'Research Foundation',
      description: 'Open research repository exploring multi-agent LLM governance, consensus formation in distributed synthetic councils, and institutional decision frameworks.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#faf9f5] border border-stone-200 rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 bg-white border-b border-stone-200/80 text-stone-900 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center font-serif text-lg font-bold">
              ✦
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-stone-900 tracking-tight">
                About the Creators & Ecosystem
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Rishi Roy (AI Product Builder & Strategist) • Prof. Som Sekhar Bhattacharyya (IIM Nagpur)
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-stone-100 p-0.5 rounded-xl border border-stone-200 text-xs font-semibold mr-2">
              <button
                type="button"
                onClick={() => setActiveTab('about')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'about' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                About Creators
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'products' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
              >
                Portfolio Products
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab 1: About the Creators (Rishi Prominent + Som Sekhar Detailed) */}
        {activeTab === 'about' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 animate-fadeIn">
            {/* Rishi Roy (Prominent Placement) */}
            <div className="bg-white border-2 border-stone-900/90 rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-stone-900 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-bl-2xl">
                Creator & Product Architect
              </div>

              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden border-2 border-stone-800 bg-stone-100 flex-shrink-0 shadow-sm">
                  <img
                    src="/images/rishi-roy.png"
                    alt="Rishi Roy"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-3 flex-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
                        Rishi Roy
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-900 border border-amber-200">
                        INSEAD MBA
                      </span>
                    </div>
                    <p className="text-xs font-mono text-stone-500 mt-0.5">
                      AI Product Builder & Strategist • Seeking Senior AI Leadership (Head of AI / AI Strategy Lead)
                    </p>
                  </div>

                  <blockquote className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans border-l-2 border-amber-500 pl-3 italic">
                    "Rishi Roy is an AI product builder and strategist with an MBA from INSEAD. With a creative background and a passion for leveraging AI to transform organizational decision-making, he focuses on building multi-agent systems that challenge conventional thinking. Nirmay is his exploration into adversarial AI councils that break through the single-LLM echo chamber. He is actively seeking senior AI leadership roles where he can help non-technical organizations adopt AI strategically."
                  </blockquote>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="https://www.linkedin.com/in/rishiroy/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      <Linkedin className="w-4 h-4 text-sky-400" />
                      <span>Connect on LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Prof. Som Sekhar Bhattacharyya */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-7 shadow-xs">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex flex-col items-center justify-center font-serif text-2xl font-bold flex-shrink-0 shadow-xs">
                  <GraduationCap className="w-8 h-8 text-amber-800 mb-1" />
                  <span className="text-[10px] font-mono font-bold">IIM Nagpur</span>
                </div>

                <div className="space-y-2.5 flex-1">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                        Som Sekhar Bhattacharyya
                      </h4>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-stone-100 text-stone-700 border border-stone-200">
                        Academic Demonstration Lead
                      </span>
                    </div>
                    <p className="text-xs font-mono text-amber-900 font-medium">
                      Professor, Strategy & Entrepreneurship, Indian Institute of Management Nagpur
                    </p>
                    <p className="text-[11px] font-sans text-stone-500 italic mt-0.5">
                      ★ IIT (ISM) Dhanbad Classmate of Rishi Roy
                    </p>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed font-sans">
                    Prof. Bhattacharyya is a Professor in the area of Strategy and Entrepreneurship at IIM Nagpur. He holds a B.Tech from IIT (ISM) Dhanbad, a master's from IIFM Bhopal, and a doctoral degree from MDI Gurgaon. Prior to joining IIM Nagpur, he worked at IIM Mumbai for over a decade. His research interests include strategic management, entrepreneurship, management of technology and innovation, and international business strategy. He has received the Emerald Outstanding Paper Author award and the Emerald Highly Recommended Paper award.
                  </p>

                  <div className="pt-1">
                    <a
                      href="https://www.linkedin.com/in/som-sekhar-bhattacharyya-2baa30104/"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-stone-800 hover:text-amber-800 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-sky-600" />
                      <span>View Academic Profile on LinkedIn</span>
                      <ExternalLink className="w-3 h-3 text-stone-400" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Ecosystem Products */}
        {activeTab === 'products' && (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-5 animate-fadeIn">
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

                      <p className="text-xs text-stone-600 leading-relaxed font-sans">
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
        )}

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between text-xs text-stone-500 font-mono">
          <div>Open Source Academic Architecture • nirmay.org</div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-stone-900 text-white rounded-xl hover:bg-black font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
