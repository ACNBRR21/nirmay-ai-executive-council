import React, { useState } from 'react';
import { AuthState, AccessMode } from '../types/council';
import { Key, QrCode, ExternalLink, Sparkles, Eye, EyeOff, Lock, Copy, Check, Info, ShieldCheck, X } from 'lucide-react';

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
  const [showApiKey, setShowApiKey] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'2' | '5' | '10'>('5');

  if (!isOpen) return null;

  const upiId = 'rishi.roy-1@okhdfcbank';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleSave = () => {
    let isConfigured = false;
    if (selectedMode === 'byok' && apiKey.trim().length > 10) {
      isConfigured = true;
    } else if (selectedMode === 'prepaid' && passcode.trim().length >= 6) {
      isConfigured = true;
    } else if (selectedMode === 'demo') {
      isConfigured = true;
    }

    onSaveAuth({
      mode: selectedMode,
      apiKey: apiKey.trim(),
      passcode: passcode.trim(),
      proxyUrl: 'https://council-api-proxy.your-cloudflare-subdomain.workers.dev',
      isConfigured
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#faf9f5] border border-stone-200 rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center space-x-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 border border-amber-200 flex items-center justify-center font-serif text-lg font-bold">
              ✦
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-stone-900 tracking-tight">
                Council Access & Compute Token Economics
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Academic & Non-Commercial Deployment • Nirmay Open Architecture
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Non-Commercial Academic Disclaimer Box */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 space-y-1.5 font-sans leading-relaxed">
            <div className="flex items-center space-x-2 font-bold text-amber-900 font-mono text-[11px] uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-amber-700" />
              <span>Non-Commercial Research Initiative</span>
            </div>
            <p>
              This is a non-commercial academic research project hosted on <strong>nirmay.org</strong> and demonstrated for senior strategic executives in the <strong>Executive Education program at IIM (Indian Institute of Management)</strong> by Professor SomShekhar. 
              <strong> The money collected is exclusively to run the models and reimburse frontier API inferencing compute tokens.</strong>
            </p>
          </div>

          {/* Access Mode Selector */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-stone-100/90 rounded-2xl border border-stone-200">
            <button
              onClick={() => setSelectedMode('byok')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                selectedMode === 'byok'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Key className="w-3.5 h-3.5 text-indigo-600" />
              <span>Mode A: BYOK (Free)</span>
            </button>
            <button
              onClick={() => setSelectedMode('prepaid')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                selectedMode === 'prepaid'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5 text-amber-600" />
              <span>Mode B: UPI Compute Tier</span>
            </button>
            <button
              onClick={() => setSelectedMode('demo')}
              className={`flex items-center justify-center space-x-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                selectedMode === 'demo'
                  ? 'bg-white text-stone-900 shadow-xs border border-stone-200'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Exec Demo Mode</span>
            </button>
          </div>

          {/* MODE A: BYOK */}
          {selectedMode === 'byok' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs">
                <div className="flex items-start space-x-3">
                  <Key className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-stone-700 space-y-1">
                    <p className="font-bold text-sm text-stone-900">
                      Bring Your Own OpenRouter API Key (100% Free Platform)
                    </p>
                    <p className="leading-relaxed text-stone-600">
                      If you have your own OpenRouter key, you can run all council models with zero platform markups. Your key is stored exclusively in your browser's <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">localStorage</code>. 
                      Requests dispatch directly from your client to <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">openrouter.ai/api/v1/chat/completions</code>.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-mono">
                  Your OpenRouter API Key
                </label>
                <div className="relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    className="w-full px-4 py-2.5 bg-white border border-stone-200 rounded-xl text-sm font-mono text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400 pr-10 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-3.5 top-3 text-stone-400 hover:text-stone-600"
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-stone-500">
                  <span>Need an OpenRouter key?</span>
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center space-x-1"
                  >
                    <span>Generate key on OpenRouter.ai</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* MODE B: UPI PREPAID TIER */}
          {selectedMode === 'prepaid' && (
            <div className="space-y-5 animate-fadeIn">
              {/* Estimated Model Compute Cost Breakdown */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-stone-500">
                    Transparent Compute Cost Estimation (+20% Safety Margin):
                  </span>
                  <span className="text-[10px] text-stone-400 font-mono">9 LLM Calls / Run</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedTier('2')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTier === '2'
                        ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-stone-900">$2 (₹170)</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-stone-200 font-mono">Single Run</span>
                    </div>
                    <div className="text-[11px] text-stone-600 font-medium">Medium Council Run</div>
                    <p className="text-[10px] text-stone-500 mt-1">
                      ~30k tokens across 4 models + Chairman. Base: $1.50 + 20% buffer ($1.80 rounded).
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier('5')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTier === '5'
                        ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-stone-900">$5 (₹425)</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-200 text-amber-900 font-mono font-bold">Multi-Pass</span>
                    </div>
                    <div className="text-[11px] text-stone-600 font-medium">Medium Session Pass</div>
                    <p className="text-[10px] text-stone-500 mt-1">
                      Covers 3 iterative strategic dilemmas or sensitivity analyses with Claude 3.5 Sonnet & GPT-4o.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTier('10')}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTier === '10'
                        ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400 shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-stone-900">$10 (₹850)</span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-mono">Frontier</span>
                    </div>
                    <div className="text-[11px] text-stone-600 font-medium">Heavy Reasoning Council</div>
                    <p className="text-[10px] text-stone-500 mt-1">
                      Claude 3.7 Sonnet, o3-mini, DeepSeek R1, Gemini 2.5 Pro (~70k reasoning tokens. Base: $7.20 + 20%).
                    </p>
                  </button>
                </div>
              </div>

              {/* Official Google Pay QR Code Image & Details */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-center gap-6">
                <div className="w-44 h-56 bg-stone-50 rounded-2xl p-2.5 border border-stone-200 shadow-xs flex flex-col items-center justify-center flex-shrink-0">
                  <img
                    src="/images/google-pay-qr.png"
                    alt="Rishi Roy Google Pay QR Code"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                <div className="space-y-3 text-xs text-stone-600 flex-1">
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900">
                      Scan to Contribute via Google Pay or Any UPI App
                    </h4>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      PhonePe, Google Pay, Paytm, CRED, BHIM
                    </p>
                  </div>

                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-stone-500 text-[10px] uppercase">Official UPI ID:</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-300 hover:bg-stone-100 text-[11px] font-semibold text-stone-700 transition-colors shadow-xs"
                      >
                        {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-500" />}
                        <span>{copiedUpi ? 'Copied' : 'Copy UPI'}</span>
                      </button>
                    </div>
                    <div className="font-mono font-bold text-sm text-stone-900 select-all">
                      {upiId}
                    </div>
                    <div className="text-[11px] text-stone-500 flex items-center justify-between pt-1 border-t border-stone-200/60">
                      <span>Recipient: <strong>Rishi Roy</strong></span>
                      <span>Target: <strong>${selectedTier} (₹{selectedTier === '2' ? '170' : selectedTier === '5' ? '425' : '850'} INR)</strong></span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl text-[11px] text-emerald-900 space-y-0.5">
                    <div className="font-bold flex items-center space-x-1 text-emerald-800">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Security & Public Safety Assessment</span>
                    </div>
                    <p className="text-emerald-800/80 leading-relaxed">
                      Sharing this bank VPA (<code className="font-mono">rishi.roy-1@okhdfcbank</code>) is safe. A UPI VPA is cryptographically designed by NPCI solely to receive inbound payments into the account—it cannot be used to debit or withdraw funds.
                    </p>
                  </div>
                </div>
              </div>

              {/* Passcode Input Field */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider font-mono">
                  Enter Your One-Time Session Passcode
                </label>
                <input
                  type="text"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value.toUpperCase())}
                  placeholder="COUNCIL-XXXX-YYYY"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono text-stone-900 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
                />
                <p className="text-[11px] text-stone-500">
                  Upon completing payment on UPI, Rishi Roy will provide your one-time session token valid for your strategic challenge session.
                </p>
              </div>
            </div>
          )}

          {/* MODE C: EXEC SIMULATION / DEMO */}
          {selectedMode === 'demo' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center space-x-2 font-bold text-amber-900 font-serif text-base">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Executive Classroom Demonstration Mode</span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed font-sans">
                  Built specifically for classroom demonstrations by Professor SomShekhar at IIM Executive Education and portfolio evaluation. 
                  Executes the full 3-stage Divergence, Peer Review War Room, and Chairman Synthesis using authentic McKinsey/INSEAD level synthesis models with zero token charges or API credentials.
                </p>
              </div>
              <div className="p-3.5 bg-white border border-stone-200 rounded-xl text-xs text-stone-700 flex items-center space-x-2.5 shadow-xs">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Instant access. Zero setup or payment required to evaluate the council pattern.</span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-stone-500 font-sans">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Secure client-side storage</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2.5 text-xs font-semibold bg-stone-900 hover:bg-black text-white rounded-xl shadow-md transition-all flex items-center space-x-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save & Connect</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
