import React from 'react';
import { ExternalLink } from 'lucide-react';

interface FooterProps {
  onOpenPortfolio: () => void;
  onOpenSetup: () => void;
  onOpenGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPortfolio, onOpenSetup, onOpenGuide }) => {
  return (
    <footer className="mt-20 bg-white border-t border-stone-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-100">
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="font-serif font-bold text-base text-stone-900 tracking-tight">
                Nirmay AI Executive Council
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                Crucible-Standard
              </span>
            </div>
            <p className="text-xs text-stone-500 max-w-xl leading-relaxed">
              Demonstrated by <strong>Professor SomShekhar</strong> for senior strategic executives in the <strong>Executive Education program at IIM (Indian Institute of Management)</strong>.
            </p>
          </div>

          {/* Ecosystem Links */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <a
              href="https://nirmay.health"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-300 hover:text-stone-900 text-stone-700 transition-all shadow-xs"
              title="Nirmay.health - Eye drop tracking tool with synopsis of reports"
            >
              <span>Nirmay.health</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <a
              href="https://anchorandflow.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-300 hover:text-stone-900 text-stone-700 transition-all shadow-xs"
            >
              <span>Anchor & Flow</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <a
              href="https://broccoberry.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-300 hover:text-stone-900 text-stone-700 transition-all shadow-xs"
            >
              <span>broccoberry.com</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </a>
            <a
              href="https://nirmay.org"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 hover:text-amber-950 transition-all font-semibold shadow-xs"
            >
              <span>nirmay.org</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center space-x-2">
            <span>Built for IIM Executive Education by</span>
            <span className="font-semibold text-stone-800">Rishi Roy & SomShekhar</span>
            <span>•</span>
            <span className="text-stone-400">Open Source Academic Architecture</span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={onOpenGuide}
              className="text-stone-600 hover:text-amber-800 font-medium transition-colors"
            >
              Council Architecture Guide
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={onOpenPortfolio}
              className="text-stone-600 hover:text-amber-800 font-medium transition-colors"
            >
              Architect Portfolio
            </button>
            <span className="text-stone-300">•</span>
            <button
              onClick={onOpenSetup}
              className="text-stone-600 hover:text-amber-800 font-medium transition-colors"
            >
              Compute Token Pricing & UPI
            </button>
            <span className="text-stone-300">•</span>
            <span className="text-stone-400 font-mono text-[11px]">MIT Academic License</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
