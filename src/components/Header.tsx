import React from 'react';
import { AuthState } from '../types/council';
import { Key, QrCode, Sparkles, Layers, ShieldCheck, ChevronRight } from 'lucide-react';

interface HeaderProps {
  auth: AuthState;
  onOpenSetup: () => void;
  onOpenPortfolio: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  auth,
  onOpenSetup,
  onOpenPortfolio,
  onReset,
  isProcessing
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo & Academic Branding */}
          <div className="flex items-center space-x-3.5 cursor-pointer group" onClick={onReset}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-slate-900 text-white flex items-center justify-center font-serif font-black text-xl shadow-lg shadow-indigo-500/20 border border-indigo-400/30 group-hover:border-indigo-400 transition-all">
              <span className="text-white drop-shadow">N</span>
            </div>
            <div>
              <div className="flex items-center space-x-2.5">
                <span className="font-serif font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-indigo-200 transition-colors">
                  Nirmay AI Executive Council
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  IIM Exec Ed
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans flex items-center space-x-2">
                <span className="text-slate-400">Prof. SomShekhar</span>
                <span className="text-slate-600">•</span>
                <span className="text-slate-400">Rishi Roy</span>
                <span className="text-slate-600">•</span>
                <a
                  href="https://nirmay.org"
                  target="_blank"
                  rel="noreferrer"
                  className="text-indigo-400 hover:text-indigo-300 font-mono transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  nirmay.org
                </a>
              </div>
            </div>
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Portfolio Products Button */}
            <button
              onClick={onOpenPortfolio}
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-all shadow-sm"
              title="Architect Portfolio: Rishi Roy (Nirmay.health, Anchor & Flow, broccoberry.com)"
            >
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Architect Portfolio</span>
            </button>

            {/* Access Mode Pill */}
            <button
              onClick={onOpenSetup}
              disabled={isProcessing}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-slate-700/80 bg-slate-900/90 hover:bg-slate-800 text-xs font-medium text-slate-200 transition-all hover:border-slate-600 shadow-sm"
              title="Configure Gateway & API Keys"
            >
              {auth.mode === 'byok' && (
                <>
                  <Key className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline text-slate-400">Mode:</span>
                  <span className="font-semibold text-white">BYOK (Free)</span>
                </>
              )}
              {auth.mode === 'prepaid' && (
                <>
                  <QrCode className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-slate-400">Mode:</span>
                  <span className="font-semibold text-white">Prepaid Passcode</span>
                </>
              )}
              {auth.mode === 'demo' && (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline text-slate-400">Mode:</span>
                  <span className="font-semibold text-amber-300">Exec Simulation</span>
                </>
              )}
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 ml-1"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
