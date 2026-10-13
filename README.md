# Nirmay AI Executive Council

> **Academic Open-Source Architecture**  
> Hosted on **[nirmay.org](https://nirmay.org)**  
> Demonstrated by **Professor SomShekhar** for senior strategic executives in the **Executive Education Program at IIM (Indian Institute of Management)**.  
> Flagship portfolio piece by AI architect **Rishi Roy** ([Nirmay.health](https://nirmay.health), [Anchor & Flow](https://anchorandflow.com), [broccoberry.com](https://broccoberry.com)).

---

## 🏛️ Executive Summary & Concept

The **Nirmay AI Executive Council** executes a 3-stage LLM reasoning pipeline to solve complex strategic problems without single-model confirmation bias or unhedged hallucination:

1. **Stage 1: Divergence (Independent Parallel Generation)**  
   Four distinct frontier AI models independently analyze the executive challenge and formulate first-principles strategic solutions without seeing each other's outputs.
2. **Stage 2: The War Room (Anonymized Red-Team Peer Review)**  
   Model attributions are stripped. Solutions are labeled `Proposal Alpha`, `Proposal Beta`, `Proposal Gamma`, and `Proposal Delta`. All 4 models cross-examine each proposal simultaneously to uncover logical flaws, fragile unit economics, and hidden diamond insights.
3. **Stage 3: Executive Synthesis (Chairman Decision Memo)**  
   The appointed Council Chairman reviews the original problem, the 4 divergent proposals, and the 4 peer critiques to synthesize a board-level **Executive Decision Memo** containing:
   - Core Verdict & Fundamental Strategic Bet
   - Resolved Disagreements & Reconciled Tensions
   - Phased 3-Horizon Implementation Roadmap (Days 1–90, Months 3–12, Months 12–36)
   - Red Flags, Failure Modes & Kill-Criteria
   - Capital & Governance Directives

---

## ⚡ Council Model Configurations

| Council Tier | Models in Roster | Appointed Chairman | Primary Strategic Focus |
| :--- | :--- | :--- | :--- |
| **Medium Council ($5 Tier)** | `anthropic/claude-3.5-sonnet`<br>`openai/gpt-4o`<br>`deepseek/deepseek-chat`<br>`google/gemini-2.5-flash` | **Claude 3.5 Sonnet** | Analytical rigor, operational execution, SLM cost efficiency, and rapid multi-domain synthesis. |
| **Heavy Frontier ($10 Tier)** | `anthropic/claude-3.7-sonnet`<br>`openai/o3-mini`<br>`deepseek/deepseek-r1`<br>`google/gemini-2.5-pro` | **Claude 3.7 Sonnet** | Frontier hybrid reasoning, formal logical proofs, deep chain-of-thought red-teaming, and multi-modal knowledge scaling. |

---

## 🔐 Access Modes & Gateway Authentication

1. **Mode A: BYOK (Bring Your Own Key) - 100% Free**
   - User inputs their OpenRouter API key (`sk-or-v1-...`).
   - Saved locally in the user's browser `localStorage`.
   - API calls dispatch directly from the browser to `https://openrouter.ai/api/v1/chat/completions` with zero middleware logging.
2. **Mode B: Prepaid Tier ($5 Medium / $10 Heavy)**
   - Displays a dynamic UPI QR Code (`upi://pay?pa=rishi@upi&pn=Rishi%20Roy&am=425&cu=INR&tn=COUNCIL`).
   - Scanning and completing payment issues a 12-character one-time session Passcode (e.g. `EXEC-XXXX-YYYY`).
   - Requests proxy securely through a Cloudflare Worker: `https://council-api-proxy.your-cloudflare-subdomain.workers.dev` with `Authorization: Bearer <PASSCODE>`.
3. **Mode C: Executive Simulation / Demo Mode**
   - Built specifically for classroom demonstrations by Professor SomShekhar at IIM.
   - Executes full 3-stage visual pipelines with authentic McKinsey/INSEAD level outputs without consuming live API tokens.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (Executive palette: Slate 900, White, Subtle Indigo accents)
- **Icons:** Lucide React
- **Orchestration:** Sequential `Promise.all` multi-model fan-out
- **Proxy:** Cloudflare Worker (in `cloudflare-worker/worker.js`)
- **Zero Backend Required:** All calls client-side direct or proxied

---

## 🚀 Getting Started

### Local Development (Vite + TypeScript)
```bash
cd nirmay-council-app
npm install
npm run dev
```

### Standalone Production File
Open `artifacts/file_generation/ttl=63d/output/nirmay_ai_executive_council.html` in any modern web browser. No web server required.

---

## 💼 Architect Portfolio & Related Products

- **[Nirmay.health](https://nirmay.health):** Intelligent eye-drop tracking tool with automated synopsis of ophthalmology reports and clinical adherence analytics.
- **[Anchor & Flow](https://anchorandflow.com):** Cognitive operating system and deep-work orchestration suite for high-leverage knowledge workers.
- **[broccoberry.com](https://broccoberry.com):** Micronutrient intelligence and personalized dietary modeling for longevity.
- **[nirmay.org](https://nirmay.org):** Academic research foundation for distributed multi-agent LLM consensus.
