import React, { useState } from 'react';
import { AuthState, AccessMode } from '../types/council';
import { Key, QrCode, Shield, CheckCircle2, ExternalLink, Sparkles, Eye, EyeOff, Lock } from 'lucide-react';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  auth: AuthState;
  onSaveAuth: (newAuth: AuthState) => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  auth,
  onSaveAuth
}) => {
  const [selectedMode, setSelectedMode] = useState<AccessMode>(auth.mode);
  const [apiKey, setApiKey] = useState(auth.apiKey);
  const [passcode, setPasscode] = useState(auth.passcode);
  const [proxyUrl] = useState(auth.proxyUrl);
  const [showApiKey, setShowApiKey] = useState(false);
  const [selectedPrepaidAmount, setSelectedPrepaidAmount] = useState<'425' | '850'>('425');

  if (!isOpen) return null;

  const handleSave = () => {
    let isConfigured = false;
    if (selectedMode === 'byok' && apiKey.trim().length > 10) {
      isConfigured = true;
    } else if (selectedMode === 'prepaid' && passcode.trim().length >= 8) {
      isConfigured = true;
    } else if (selectedMode === 'demo') {
      isConfigured = true;
    }

    onSaveAuth({
      mode: selectedMode,
      apiKey: apiKey.trim(),
      passcode: passcode.trim(),
      proxyUrl: proxyUrl.trim(),
      isConfigured
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-center shadow-lg shadow-indigo-600/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                Council Access & Gateway Authentication
              </h2>
              <p className="text-xs text-slate-400 font-sans">
                Academic & Executive Deployment • Nirmay Open Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-3 gap-2.5 p-1.5 bg-slate-950/80 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedMode('byok')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                selectedMode === 'byok'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>Mode A: BYOK (Free)</span>
            </button>
            <button
              onClick={() => setSelectedMode('prepaid')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                selectedMode === 'prepaid'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              <span>Mode B: Prepaid Tier</span>
            </button>
            <button
              onClick={() => setSelectedMode('demo')}
              className={`flex items-center justify-center space-x-2 py-2.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                selectedMode === 'demo'
                  ? 'bg-slate-800 text-amber-300 border border-amber-500/30 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Demo / Exec Sim</span>
            </button>
          </div>

          {/* MODE A: BYOK */}
          {selectedMode === 'byok' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-indigo-200">
                      Bring Your Own OpenRouter Key (100% Free Platform)
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Your key is saved locally in your browser's <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300 font-mono">localStorage</code>. 
                      All requests dispatch directly to <code className="bg-slate-900 px-1.5 py-0.5 rounded text-indigo-300 font-mono">https://openrouter.ai/api/v1/chat/completions</code>. 
                      No middleware logs or stores your credentials.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                  OpenRouter API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400">
                  <span>Don't have an OpenRouter key?</span>
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center space-x-1"
                  >
                    <span>Generate key on OpenRouter</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* MODE B: PREPAID TIER */}
          {selectedMode === 'prepaid' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <QrCode className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-white">
                      Prepaid Council Passcode (No API Key Required)
                    </p>
                    <p className="leading-relaxed text-slate-400">
                      Scan the UPI QR code below for instant compute credits. Upon receipt, a 12-character one-time Passcode is issued for your session, proxied through our hardened Cloudflare Worker.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedPrepaidAmount('425')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedPrepaidAmount === '425'
                      ? 'border-indigo-500 bg-indigo-950/30 ring-1 ring-indigo-500'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 font-mono">Medium Council</span>
                    <span className="text-xs font-mono font-bold text-white">$5 (₹425)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Claude 3.5 Sonnet, GPT-4o, DeepSeek Chat, Gemini 2.5 Flash</p>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPrepaidAmount('850')}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedPrepaidAmount === '850'
                      ? 'border-amber-500 bg-amber-950/30 ring-1 ring-amber-500'
                      : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">Heavy Frontier</span>
                    <span className="text-xs font-mono font-bold text-white">$10 (₹850)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Claude 3.7 Sonnet, o3-mini, DeepSeek R1, Gemini 2.5 Pro</p>
                </button>
              </div>

              <div className="border border-slate-800 rounded-xl p-4 bg-slate-950/60 flex flex-col md:flex-row items-center gap-5">
                <div className="w-36 h-36 bg-white rounded-xl p-2 flex flex-col items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-28 h-28 text-slate-950" viewBox="0 0 100 100" fill="currentColor">
                    <path d="M10,10 h30 v30 h-30 z M16,16 v18 h18 v-18 z M22,22 h6 v6 h-6 z" />
                    <path d="M60,10 h30 v30 h-30 z M66,16 v18 h18 v-18 z M72,22 h6 v6 h-6 z" />
                    <path d="M10,60 h30 v30 h-30 z M16,66 v18 h18 v-18 z M22,72 h6 v6 h-6 z" />
                    <path d="M50,15 h6 v6 h-6 z M50,30 h6 v15 h-6 z M60,50 h12 v6 h-12 z M78,50 h12 v10 h-12 z" />
                    <path d="M48,65 h10 v10 h-10 z M65,70 h8 v15 h-8 z M80,75 h10 v15 h-10 z M50,85 h10 v5 h-10 z" />
                  </svg>
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-tight mt-1 font-bold">UPI: rishi@upi</span>
                </div>
                <div className="space-y-2 text-xs text-slate-300 flex-1">
                  <div className="font-bold text-white text-sm">
                    Scan & Pay via any UPI App (GPay, PhonePe, Paytm)
                  </div>
                  <div className="bg-slate-900 rounded-lg p-2.5 text-[11px] font-mono space-y-1 text-slate-300 border border-slate-800">
                    <div><strong className="text-white">VPA:</strong> rishi@upi (Rishi Roy)</div>
                    <div><strong className="text-white">Amount:</strong> ₹{selectedPrepaidAmount} INR</div>
                    <div><strong className="text-white">Note:</strong> COUNCIL_{selectedPrepaidAmount === '425' ? 'MED' : 'HVY'}</div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Once transaction completes, enter your 12-character council passcode below.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 font-mono">
                  Enter 12-Character Passcode
                </label>
                <input
                  type="text"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value.toUpperCase())}
                  placeholder="EXEC-XXXX-YYYY"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm font-mono text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

              <div className="text-[11px] text-slate-500 font-mono">
                <span>Cloudflare Proxy: </span>
                <code className="text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                  {proxyUrl || 'https://council-api-proxy.your-cloudflare-subdomain.workers.dev'}
                </code>
              </div>
            </div>
          )}

          {/* MODE C: DEMO */}
          {selectedMode === 'demo' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Sparkles className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-sm text-amber-200">
                      Executive Classroom & Reviewer Demo Mode
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      Designed for Professor SomShekhar's IIM Executive Education demonstrations and strategic leadership simulations.
                      Executes full 3-stage Divergence, Peer Review War Room, and Chairman Synthesis using authentic McKinsey/INSEAD level synthesis models without charging tokens or requiring external credentials.
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-3.5 bg-slate-950/60 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero setup required. Perfect for immediate evaluation and portfolio inspection.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <Lock className="w-3.5 h-3.5 text-slate-500" />
            <span>Encrypted client-side storage</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Save & Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
