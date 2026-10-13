import React from 'react';
import { AuthState } from '../types/council';
import { Key, QrCode, Sparkles, Layers, BookOpen } from 'lucide-react';

interface HeaderProps {
  auth: AuthState;
  onOpenSetup: () => void;
  onOpenPortfolio: () => void;
  onOpenGuide: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  auth,
  onOpenSetup,
  onOpenPortfolio,
  onOpenGuide,
  onReset,
  isProcessing
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3.5 cursor-pointer group" onClick={onReset}>
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-400 flex items-center justify-center font-serif text-xl shadow-sm border border-stone-800 group-hover:scale-105 transition-transform">
              <span className="font-serif font-bold text-amber-300">✦</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-stone-900 tracking-tight group-hover:text-amber-800 transition-colors">
                  Nirmay AI Executive Council
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100/70 text-amber-900 border border-amber-200/80 font-mono">
                  IIM Exec Ed
                </span>
              </div>
              <div className="text-[11px] text-stone-500 font-sans flex items-center space-x-2">
                <span>Prof. SomShekhar</span>
                <span className="text-stone-300">•</span>
                <span>Rishi Roy</span>
                <span className="text-stone-300">•</span>
                <a
                  href="https://nirmay.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-stone-600 hover:text-amber-700 font-mono transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  nirmay.org
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenGuide}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-all shadow-xs hover:border-stone-300"
              title="Explore the LLM Council Architecture & Andrej Karpathy's System 2 Thesis"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span className="hidden sm:inline">Council Architecture</span>
            </button>

            <button
              onClick={onOpenPortfolio}
              className="hidden md:inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-all shadow-xs hover:border-stone-300"
              title="Architect Portfolio: Rishi Roy (Nirmay.health, Anchor & Flow, broccoberry.com)"
            >
              <Layers className="w-3.5 h-3.5 text-stone-500" />
              <span>Portfolio</span>
            </button>

            <button
              onClick={onOpenSetup}
              disabled={isProcessing}
              className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl border border-stone-300/80 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 transition-all hover:border-stone-400 shadow-xs"
              title="Configure API Gateway, UPI Contribution & Compute Pricing"
            >
              {auth.mode === 'byok' && (
                <>
                  <Key className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="hidden sm:inline text-stone-500">Mode:</span>
                  <span className="font-semibold text-stone-900">BYOK (Free)</span>
                </>
              )}
              {auth.mode === 'prepaid' && (
                <>
                  <QrCode className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline text-stone-500">Mode:</span>
                  <span className="font-semibold text-stone-900">Prepaid Passcode</span>
                </>
              )}
              {auth.mode === 'demo' && (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden sm:inline text-stone-500">Mode:</span>
                  <span className="font-semibold text-amber-800">Exec Simulation</span>
                </>
              )}
              <span className="w-2 h-2 rounded-full bg-emerald-500 ml-1"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
