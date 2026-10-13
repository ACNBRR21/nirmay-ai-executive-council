import React, { useState } from 'react';
import { AuthState, KeyStatus } from '../types/council';
import { Key, QrCode, Sparkles, Layers, BookOpen, Users, HelpCircle, Coins, RefreshCw, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface HeaderProps {
  auth: AuthState;
  keyStatus?: KeyStatus;
  onRefreshKeyStatus?: () => void;
  isRefreshingKey?: boolean;
  onOpenSetup: () => void;
  onOpenPortfolio: () => void;
  onOpenGuide: () => void;
  onOpenAbout: () => void;
  onOpenHelp: () => void;
  onReset: () => void;
  isProcessing: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  auth,
  keyStatus,
  onRefreshKeyStatus,
  isRefreshingKey,
  onOpenSetup,
  onOpenPortfolio,
  onOpenGuide,
  onOpenAbout,
  onOpenHelp,
  onReset,
  isProcessing
}) => {
  const [isTokenDropdownOpen, setIsTokenDropdownOpen] = useState(false);

  const limit = keyStatus?.limit !== null && keyStatus?.limit !== undefined ? keyStatus.limit : 50.00;
  const used = keyStatus?.usage || 12.30;
  const remaining = keyStatus?.limit_remaining !== null && keyStatus?.limit_remaining !== undefined 
    ? keyStatus.limit_remaining 
    : Math.max(0, limit - used);

  const percentUsed = limit > 0 ? Math.min(100, Math.round((used / limit) * 100)) : 25;
  const percentRemaining = Math.max(0, 100 - percentUsed);

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f5]/90 backdrop-blur-md border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div className="flex items-center space-x-3.5 cursor-pointer group" onClick={onReset}>
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-amber-300 flex items-center justify-center font-serif text-xl shadow-sm border border-stone-800 group-hover:scale-105 transition-transform">
              <span>✦</span>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif font-bold text-lg text-stone-900 tracking-tight group-hover:text-amber-800 transition-colors">
                  Nirmay AI Executive Council
                </span>
                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100/70 text-amber-900 border border-amber-200/80 font-mono">
                  IIM Nagpur
                </span>
              </div>
              <div className="text-[11px] text-stone-500 font-sans flex items-center space-x-2">
                <span>Prof. Som Sekhar Bhattacharyya</span>
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

          {/* Navigation Links & Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Help / BYOK Guide */}
            <button
              onClick={onOpenHelp}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-all shadow-xs"
              title="How to use Nirmay with your own OpenRouter key (Free & Unlimited)"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden md:inline">How to Use (BYOK)</span>
            </button>

            {/* Architecture Guide (Karpathy / Poster) */}
            <button
              onClick={onOpenGuide}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-all shadow-xs"
              title="Explore the LLM Council Architecture & Andrej Karpathy's System 2 Thesis"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Council Guide</span>
            </button>

            {/* About & Creators (Rishi & Som Sekhar) */}
            <button
              onClick={onOpenAbout}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 text-xs font-medium transition-all shadow-xs"
              title="About Rishi Roy & Prof. Som Sekhar Bhattacharyya"
            >
              <Users className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">About</span>
            </button>

            {/* Token Status Monitor Widget */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsTokenDropdownOpen(!isTokenDropdownOpen)}
                className="inline-flex items-center space-x-2 px-3 py-2 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-xs font-mono text-stone-800 transition-all shadow-xs"
                title="OpenRouter Token & Credit Balance"
              >
                <Coins className="w-3.5 h-3.5 text-emerald-600" />
                <span className="font-semibold">${remaining.toFixed(2)}</span>
                <span className="text-[10px] text-stone-400 font-sans hidden lg:inline">rem.</span>
                {isTokenDropdownOpen ? <ChevronUp className="w-3 h-3 text-stone-400" /> : <ChevronDown className="w-3 h-3 text-stone-400" />}
              </button>

              {/* Popover Dropdown Card */}
              {isTokenDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white border border-stone-200 rounded-2xl shadow-xl p-4 z-50 animate-fadeIn font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <span className="font-bold text-stone-900 flex items-center space-x-1.5">
                      <Coins className="w-4 h-4 text-emerald-600" />
                      <span>Token Balance</span>
                    </span>
                    {onRefreshKeyStatus && (
                      <button
                        type="button"
                        onClick={onRefreshKeyStatus}
                        disabled={isRefreshingKey}
                        className="p-1 text-stone-400 hover:text-stone-600 rounded-md hover:bg-stone-50"
                        title="Refresh token balance"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingKey ? 'animate-spin' : ''}`} />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1.5 text-[11px] text-stone-600">
                    <div className="flex justify-between">
                      <span>Limit:</span>
                      <span className="font-bold text-stone-900">${limit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Used:</span>
                      <span className="font-bold text-stone-700">${used.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-stone-900 font-semibold pt-1 border-t border-stone-100">
                      <span>Remaining:</span>
                      <span className="font-bold text-emerald-700">${remaining.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden flex">
                      <div
                        style={{ width: `${percentRemaining}%` }}
                        className="h-full bg-emerald-500 transition-all duration-500"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-stone-400 font-sans">
                      <span>{percentRemaining}% budget left</span>
                      <span>OpenRouter Key</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsTokenDropdownOpen(false);
                        onOpenSetup();
                      }}
                      className="w-full py-1.5 px-3 bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 rounded-lg text-center font-sans font-medium text-[11px] transition-colors"
                    >
                      Manage Key / Top-Up
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Gateway / Prepaid Settings Button */}
            <button
              onClick={onOpenSetup}
              disabled={isProcessing}
              className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl border border-stone-300 bg-white hover:bg-stone-50 text-xs font-medium text-stone-800 transition-all shadow-xs"
              title="Configure API Gateway & Keys"
            >
              <Key className="w-3.5 h-3.5 text-indigo-600" />
              <span className="hidden sm:inline font-semibold">Settings</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 ml-0.5"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
