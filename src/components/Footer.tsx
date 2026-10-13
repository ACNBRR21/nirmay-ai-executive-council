import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenPortfolio: () => void;
  onOpenSetup: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortfolio, onOpenSetup }) => {
  return (
    <footer className="mt-20 bg-slate-950 border-t border-slate-800/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="font-serif font-bold text-base text-white tracking-tight">
                Nirmay AI Executive Council
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                v2.5-Executive
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              Demonstrated by <strong>Professor SomShekhar</strong> for senior strategic executives in the <strong>Executive Education program at IIM (Indian Institute of Management)</strong>.
            </p>
          </div>

          {/* Ecosystem Links */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a
              href="https://nirmay.health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-300 text-slate-300 transition-all shadow-sm"
              title="Nirmay.health - Eye drop tracking tool with synopsis of reports"
            >
              <span>Nirmay.health</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href="https://anchorandflow.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-300 text-slate-300 transition-all shadow-sm"
            >
              <span>Anchor & Flow</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href="https://broccoberry.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:text-indigo-300 text-slate-300 transition-all shadow-sm"
            >
              <span>broccoberry.com</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
            <a
              href="https://nirmay.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-indigo-300 hover:text-indigo-200 transition-all font-semibold shadow-sm"
            >
              <span>nirmay.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <span>Built for IIM Executive Education by</span>
            <span className="font-semibold text-slate-300">Rishi Roy & SomShekhar</span>
            <span>•</span>
            <span className="text-slate-500">Open Source Academic Architecture</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenPortfolio}
              className="text-slate-400 hover:text-indigo-400 font-medium transition-colors"
            >
              Architect Portfolio
            </button>
            <span className="text-slate-700">•</span>
            <button
              onClick={onOpenSetup}
              className="text-slate-400 hover:text-indigo-400 font-medium transition-colors"
            >
              Gateway Setup
            </button>
            <span className="text-slate-700">•</span>
            <span className="text-slate-500 font-mono text-[11px]">MIT Academic License</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
