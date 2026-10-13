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
  const [copiedPaypal, setCopiedPaypal] = useState(false);
  const [selectedTier, setSelectedTier] = useState<'2' | '5' | '10'>('5');

  if (!isOpen) return null;

  const upiId = 'rishi.roy-1@okhdfcbank';
  const paypalEmail = 'rishi.roy+paypalindia@gmail.com';

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyPaypal = () => {
    navigator.clipboard.writeText(paypalEmail);
    setCopiedPaypal(true);
    setTimeout(() => setCopiedPaypal(false), 2000);
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
                Gateway Setup & Pre-Paid Keys
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
              Nirmay is an academic research project for executive education at <strong>IIM Nagpur</strong> by Professor Som Sekhar Bhattacharyya. 
              <strong> All contributions are 100% directed towards reimbursing API compute tokens consumed by the frontier models.</strong>
            </p>
          </div>

          {/* Mode Selector Tabs */}
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
              <span>Mode B: Pre-Paid Key</span>
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
              <span>Demo / Sim Mode</span>
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
                      Bring Your Own OpenRouter API Key (Primary & Free Path)
                    </p>
                    <p className="leading-relaxed text-stone-600">
                      Zero payment to us. No login. Your key is stored exclusively in your browser's <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">localStorage</code>. 
                      Requests dispatch directly from your client to <code className="bg-stone-100 px-1 py-0.5 rounded font-mono text-stone-800">openrouter.ai</code>.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5 font-mono">
                  Enter Your OpenRouter Key (Starts with sk-or-v1-...)
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
                    <span>Create key on OpenRouter.ai</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* MODE B: PRE-PAID KEY (CONVENIENCE OPTION) */}
          {selectedMode === 'prepaid' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs text-stone-600 leading-relaxed">
                <span className="font-bold text-stone-900">Convenience Setup: </span>
                If you prefer not to manage your own OpenRouter billing, Rishi Roy can generate a pre-paid child API key with a fixed spending budget corresponding to your payment.
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedTier('2')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTier === '2'
                      ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400 shadow-xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-stone-900">$2 (₹170)</div>
                  <div className="text-[11px] text-stone-600 font-medium mt-0.5">Single Council Run</div>
                  <p className="text-[10px] text-stone-500 mt-1">Covers 1 complete 9-model council deliberation.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier('5')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTier === '5'
                      ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400 shadow-xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-stone-900">$5 (₹425)</div>
                  <div className="text-[11px] text-stone-600 font-medium mt-0.5">Session Multi-Pass</div>
                  <p className="text-[10px] text-stone-500 mt-1">Covers 3 full multi-model strategic sessions.</p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier('10')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedTier === '10'
                      ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-400 shadow-xs'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="font-bold text-xs text-stone-900">$10 (₹850)</div>
                  <div className="text-[11px] text-stone-600 font-medium mt-0.5">Heavy Frontier Pass</div>
                  <p className="text-[10px] text-stone-500 mt-1">Full reasoning traces with Claude 3.7 & DeepSeek R1.</p>
                </button>
              </div>

              {/* Payment Details: Domestic UPI + International PayPal */}
              <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row items-center gap-6">
                <div className="w-40 h-52 bg-stone-50 rounded-2xl p-2 border border-stone-200 flex flex-col items-center justify-center flex-shrink-0 shadow-xs">
                  <img
                    src="/images/google-pay-qr.png"
                    alt="Rishi Roy Google Pay QR"
                    className="w-full h-auto object-contain rounded-xl"
                  />
                </div>

                <div className="space-y-3 text-xs text-stone-600 flex-1">
                  <div>
                    <h4 className="font-serif font-bold text-base text-stone-900">
                      Payment Channels (India & International)
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Scan QR or use one of the direct addresses below:
                    </p>
                  </div>

                  {/* UPI Box */}
                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-stone-500 text-[10px] uppercase font-bold">India UPI ID:</span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-300 text-[10px] font-semibold text-stone-700"
                      >
                        {copiedUpi ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-500" />}
                        <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="font-mono font-bold text-xs text-stone-900 select-all">{upiId}</div>
                  </div>

                  {/* PayPal Box */}
                  <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-stone-500 text-[10px] uppercase font-bold">International PayPal:</span>
                      <button
                        type="button"
                        onClick={handleCopyPaypal}
                        className="inline-flex items-center space-x-1 px-2 py-0.5 rounded bg-white border border-stone-300 text-[10px] font-semibold text-stone-700"
                      >
                        {copiedPaypal ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-stone-500" />}
                        <span>{copiedPaypal ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="font-mono font-bold text-xs text-stone-900 select-all">{paypalEmail}</div>
                  </div>
                </div>
              </div>

              {/* Passcode Entry */}
              <div className="bg-white border border-stone-200 rounded-2xl p-4 shadow-xs space-y-2">
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider font-mono">
                  Enter Pre-Paid Key or Passcode
                </label>
                <input
                  type="text"
                  value={passcode}
                  onChange={e => setPasscode(e.target.value.toUpperCase())}
                  placeholder="COUNCIL-XXXX-YYYY (or pre-paid sk-or-v1- key)"
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-mono text-stone-900 uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-stone-400"
                />
                <p className="text-[11px] text-stone-500">
                  After payment, Rishi will email your pre-configured key (with pre-set $5, $10, or $50 limit).
                </p>
              </div>
            </div>
          )}

          {/* MODE C: DEMO MODE */}
          {selectedMode === 'demo' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-2">
                <div className="flex items-center space-x-2 font-bold text-amber-900 font-serif text-base">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Professor Som Sekhar Bhattacharyya Demo Mode</span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed font-sans">
                  Built specifically for classroom demonstrations at IIM Nagpur and evaluator review. 
                  Demonstrates the full pipeline (Framing Clarifying Questions → Divergence → Peer Red-Teaming → Chairman Synthesis) with pre-scripted, streaming output—ensuring 100% reliability regardless of live classroom network speeds or token outages.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 sm:px-8 py-4 border-t border-stone-200/80 bg-white flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-stone-500 font-sans">
            <Lock className="w-3.5 h-3.5 text-stone-400" />
            <span>Encrypted in browser localStorage</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-stone-600 hover:text-stone-800"
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
