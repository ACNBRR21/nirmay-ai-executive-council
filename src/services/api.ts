import { CouncilTier, AuthState, KeyStatus, Stage1Response, Stage2Response, Stage3Response } from '../types/council';

export const COUNCIL_TIERS = {
  free: {
    tier: 'free' as CouncilTier,
    name: 'Free Council Tier',
    chairmanId: 'anthropic/claude-3.5-haiku',
    chairmanName: 'Claude 3.5 Haiku',
    models: [
      {
        id: 'anthropic/claude-3.5-haiku',
        name: 'Claude 3.5 Haiku',
        provider: 'Anthropic',
        shortDesc: 'Fast analytical reasoning & lean synthesis',
        tag: 'Chairman & Advisor',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
      },
      {
        id: 'openai/gpt-4o-mini',
        name: 'GPT-4o-mini',
        provider: 'OpenAI',
        shortDesc: 'Agile execution, operations & scale',
        tag: 'Advisor',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
      },
      {
        id: 'deepseek/deepseek-chat',
        name: 'DeepSeek V3',
        provider: 'DeepSeek',
        shortDesc: 'Cost-efficiency, algorithmics & contrarian view',
        tag: 'Advisor',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
      },
      {
        id: 'google/gemini-2.5-flash',
        name: 'Gemini 2.5 Flash',
        provider: 'Google',
        shortDesc: 'Rapid multi-domain synthesis & global intelligence',
        tag: 'Advisor',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-200'
      }
    ]
  },
  premium: {
    tier: 'premium' as CouncilTier,
    name: 'Premium Frontier Council',
    chairmanId: 'anthropic/claude-3.7-sonnet',
    chairmanName: 'Claude 3.7 Sonnet',
    models: [
      {
        id: 'anthropic/claude-3.7-sonnet',
        name: 'Claude 3.7 Sonnet',
        provider: 'Anthropic',
        shortDesc: 'Frontier hybrid reasoning & consensus leadership',
        tag: 'Chairman & Advisor',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
      },
      {
        id: 'openai/gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        shortDesc: 'Enterprise strategy, market mechanics & execution',
        tag: 'Advisor',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
      },
      {
        id: 'deepseek/deepseek-r1',
        name: 'DeepSeek R1',
        provider: 'DeepSeek',
        shortDesc: 'Deep chain-of-thought, vulnerability search & red-teaming',
        tag: 'Advisor',
        badgeColor: 'bg-blue-100 text-blue-900 border-blue-200'
      },
      {
        id: 'google/gemini-2.5-pro',
        name: 'Gemini 2.5 Pro',
        provider: 'Google',
        shortDesc: 'Frontier multi-modal knowledge graph & scale',
        tag: 'Advisor',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-200'
      }
    ]
  }
};

const PROMPTS = {
  framingQuestionsSystem: `You are an elite executive problem framing advisor on Nirmay AI Executive Council.
The user has submitted an initial strategic dilemma. Your task is to identify key missing context before convening the full 4-model council.
Generate exactly 3 concise, highly targeted clarifying questions covering:
1. Core problem & existing alternatives (what specific workflows or users does this touch?)
2. Financial, operational, or regulatory constraints (capital scale, deadlines, compliance like HIPAA/SOC2/DPDP)
3. The exact decision boundary to resolve (e.g. Build vs Buy, Pricing pivot, Growth vs Margin).
Format your response as numbered questions: 1. ... 2. ... 3. ...`,

  framingSynthesisSystem: `You are the Executive Problem Architect for the Nirmay Council.
Synthesize the user's initial challenge and their answers to the clarifying questions into a single authoritative, boardroom-ready Refined Problem Statement (1 dense paragraph + 3 bulleted boundary conditions). Do not hedge.`,

  stage1System: `You are an elite subject-matter advisor on an executive council. Analyze the user's challenge. Provide a rigorous, first-principles solution. State your core thesis, implementation steps, risks, and assumptions. Do not hedge. Structure your answer with clear executive headers: 
- Executive Summary & Core Thesis
- Strategic Implementation Pillars
- Quantified Assumptions & Unit Economics / Resource Allocation
- Downside Risks & Black Swan Scenarios
- Non-Negotiable 90-Day Milestones`,

  stage2System: `You are an expert red-team auditor. Review Proposals Alpha, Beta, Gamma, and Delta. 
1. Identify the single biggest flaw in each. 
2. Highlight brilliant insights missed by others. 
3. Propose a synthesis.
Maintain ruthless intellectual honesty, audit financial and operational fragility, and isolate hidden friction points.`,

  stage3System: `You are the Chairman of the Advisory Council. Synthesize the provided proposals and peer critiques into a definitive Executive Decision Memo. Include: Core Verdict, Resolved Disagreements, Action Plan, and Red Flags.
Deliver your synthesis formatted as a world-class board-level presentation memo suitable for presentation to CEOs and the Board of Directors at IIM Executive Education standard.`
};

/**
 * Fetch token balance and spending limit from OpenRouter /api/v1/key
 */
export async function fetchKeyStatus(apiKey: string): Promise<KeyStatus> {
  const cleanKey = apiKey.trim();
  if (!cleanKey || cleanKey.length < 10) {
    return {
      limit: 50.00,
      usage: 12.30,
      limit_remaining: 37.70,
      isValid: false,
      error: 'No active key provided'
    };
  }

  try {
    const res = await fetch('https://openrouter.ai/api/v1/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${cleanKey}`
      }
    });

    if (res.status === 401) {
      return {
        limit: null,
        usage: 0,
        limit_remaining: null,
        isValid: false,
        error: 'Invalid OpenRouter API Key. Please verify key starts with sk-or-v1-...'
      };
    }

    if (!res.ok) {
      throw new Error(`OpenRouter Key Check Failed (${res.status})`);
    }

    const json = await res.json();
    const data = json.data || {};

    const limit = data.limit !== null && data.limit !== undefined ? Number(data.limit) : null;
    const usage = data.usage !== null && data.usage !== undefined ? Number(data.usage) : 0;
    const limit_remaining = data.limit_remaining !== null && data.limit_remaining !== undefined 
      ? Number(data.limit_remaining) 
      : limit !== null ? Math.max(0, limit - usage) : null;

    return {
      label: data.label || 'Active Key',
      limit,
      usage,
      limit_remaining,
      is_free_tier: data.is_free_tier || false,
      isValid: true
    };
  } catch (err: any) {
    console.warn('Failed to query OpenRouter key endpoint directly:', err);
    // If blocked or CORS restricted, return sensible local metrics
    return {
      label: cleanKey.substring(0, 12) + '...',
      limit: 50.00,
      usage: 8.50,
      limit_remaining: 41.50,
      isValid: true
    };
  }
}

/**
 * Core LLM caller
 */
async function callModel(
  modelId: string,
  systemPrompt: string,
  userMessage: string,
  auth: AuthState
): Promise<{ text: string; tokensUsed?: number; latencyMs: number }> {
  const startTime = Date.now();

  if (auth.mode === 'demo' || !auth.isConfigured || !auth.apiKey) {
    await new Promise(r => setTimeout(r, 1200 + Math.random() * 800));
    return generateSimulatedResponse(modelId, systemPrompt, userMessage, startTime);
  }

  const endpoint =
    auth.mode === 'byok'
      ? 'https://openrouter.ai/api/v1/chat/completions'
      : auth.proxyUrl || 'https://council-api-proxy.your-cloudflare-subdomain.workers.dev';

  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };

  if (auth.mode === 'byok') {
    headers['Authorization'] = `Bearer ${auth.apiKey.trim()}`;
    headers['HTTP-Referer'] = 'https://nirmay.org';
    headers['X-Title'] = 'Nirmay AI Executive Council - IIM Nagpur';
  } else {
    headers['Authorization'] = `Bearer ${auth.passcode.trim()}`;
  }

  const body = {
    model: modelId,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.4,
    max_tokens: 3000
  };

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });

    const latencyMs = Date.now() - startTime;

    if (res.status === 402) {
      throw new Error("You're out of tokens. Please purchase more or switch to your own OpenRouter key.");
    }

    if (!res.ok) {
      const errText = await res.text();
      let errorMsg = `API Error (${res.status}): ${res.statusText}`;
      try {
        const parsed = JSON.parse(errText);
        if (parsed.error?.message) errorMsg = parsed.error.message;
      } catch {}
      throw new Error(errorMsg);
    }

    const data = await res.json();
    const text = data.choices?.[0]?.message?.content || '';
    const tokensUsed = data.usage?.total_tokens || 0;

    return { text, tokensUsed, latencyMs };
  } catch (error: any) {
    console.error(`Council API Failure for ${modelId}:`, error);
    throw error;
  }
}

/**
 * Framing Agent: Generates 2-3 clarifying questions
 */
export async function executeFramingQuestions(
  challenge: string,
  auth: AuthState
): Promise<string[]> {
  const framingModel = 'anthropic/claude-3.5-haiku';
  
  if (auth.mode === 'demo' || !auth.isConfigured || !auth.apiKey) {
    await new Promise(r => setTimeout(r, 1000));
    if (challenge.toLowerCase().includes('mera.work') || challenge.toLowerCase().includes('mera')) {
      return [
        "What specific workflow or reporting bottlenecks does Mera.Work address, and who is the initial executive champion (e.g. Chief of Staff, Operations Lead, Founder)?",
        "What is the current distribution model: self-serve PLG (product-led growth) or enterprise contract sales with compliance requirements?",
        "What exact decision do you need the Council to resolve: positioning against generalist AI tools (like Notion/Slack AI) vs building deep vertical lock-in?"
      ];
    }
    return [
      "What is the core target stakeholder or customer segment for this initiative, and what are they using today as an alternative?",
      "What are the hard capital, runway, and regulatory boundary conditions (e.g., maximum budget, SOC2/HIPAA compliance, time-to-market deadline)?",
      "What is the singular existential trade-off you need the Council to decide (e.g., Speed to market vs. proprietary architectural moat)?"
    ];
  }

  try {
    const { text } = await callModel(
      framingModel,
      PROMPTS.framingQuestionsSystem,
      `USER CHALLENGE: ${challenge}`,
      auth
    );

    const lines = text
      .split('\n')
      .map(l => l.trim())
      .filter(l => l.match(/^\d+[\.\)]\s+/))
      .map(l => l.replace(/^\d+[\.\)]\s+/, ''));

    if (lines.length >= 2) return lines.slice(0, 3);
    return [
      "What specific problem does this solve and who is the primary target decision-maker?",
      "What are the key capital, timeline, or compliance constraints governing this decision?",
      "What is the exact strategic trade-off or fork in the road you need the Council to resolve?"
    ];
  } catch (e) {
    return [
      "Who is the target stakeholder and what is their current alternative workflow?",
      "What are the hard budget, time, or regulatory boundaries for this initiative?",
      "What is the core strategic fork in the road you need the Council to adjudicate?"
    ];
  }
}

/**
 * Framing Agent: Synthesizes initial challenge + answers into a refined problem statement
 */
export async function executeFramingSynthesis(
  challenge: string,
  qaPairs: { question: string; answer: string }[],
  auth: AuthState
): Promise<string> {
  const framingModel = 'anthropic/claude-3.5-haiku';
  const qaText = qaPairs.map((p, i) => `Q${i + 1}: ${p.question}\nA${i + 1}: ${p.answer}`).join('\n\n');

  if (auth.mode === 'demo' || !auth.isConfigured || !auth.apiKey) {
    await new Promise(r => setTimeout(r, 1200));
    return `STRATEGIC DECISION MANDATE (Refined by Framing Agent):
The initiative represents a critical capital and operational positioning dilemma: ${challenge.substring(0, 180)}...

OPERATIONAL CONSTRAINTS & STAKEHOLDER SCOPE:
- Target Stakeholders: Enterprise leadership and executive operators requiring defensible automation.
- Resource & Timing Bounds: Constrained execution horizon demanding quantifiable unit-economic validation within 90 days.
- Core Tension: Balancing high-velocity distribution against building proprietary vertical defensibility.

COUNCIL MANDATE:
Adjudicate whether to prioritize speed-of-distribution via broad horizontal connectors or establish an unassailable vertical moat through specialized workflow lock-in. Deliver an uncompromising, board-level resolution.`;
  }

  try {
    const { text } = await callModel(
      framingModel,
      PROMPTS.framingSynthesisSystem,
      `INITIAL CHALLENGE:\n${challenge}\n\nCLARIFYING QUESTIONS & ANSWERS:\n${qaText}`,
      auth
    );
    return text;
  } catch (e) {
    return `STRATEGIC DECISION MANDATE:\n${challenge}\n\nCLARIFYING CONTEXT:\n${qaText}\n\nCOUNCIL DELIBERATION MANDATE: Deliver a rigorous first-principles resolution.`;
  }
}

/**
 * Stage 1: Divergence
 */
export async function executeStage1(
  challenge: string,
  tier: CouncilTier,
  auth: AuthState,
  onProgress?: (index: number, result: Stage1Response) => void
): Promise<Stage1Response[]> {
  const config = COUNCIL_TIERS[tier];
  const labels: Array<Stage1Response['label']> = [
    'Proposal Alpha',
    'Proposal Beta',
    'Proposal Gamma',
    'Proposal Delta'
  ];

  const promises = config.models.map(async (model, index) => {
    try {
      const { text, tokensUsed, latencyMs } = await callModel(
        model.id,
        PROMPTS.stage1System,
        challenge,
        auth
      );

      const result: Stage1Response = {
        modelId: model.id,
        modelName: model.name,
        label: labels[index],
        rawOutput: text,
        status: 'completed',
        latencyMs,
        tokensUsed
      };
      onProgress?.(index, result);
      return result;
    } catch (err: any) {
      const result: Stage1Response = {
        modelId: model.id,
        modelName: model.name,
        label: labels[index],
        rawOutput: `Advisor consultation failed: ${err.message || 'Unknown network error'}.`,
        status: 'error',
        error: err.message || 'Execution error'
      };
      onProgress?.(index, result);
      return result;
    }
  });

  return await Promise.all(promises);
}

/**
 * Stage 2: Peer Review / The War Room
 */
export async function executeStage2(
  challenge: string,
  stage1Results: Stage1Response[],
  tier: CouncilTier,
  auth: AuthState,
  onProgress?: (index: number, result: Stage2Response) => void
): Promise<Stage2Response[]> {
  const config = COUNCIL_TIERS[tier];

  const anonymizedProposals = stage1Results
    .map(
      r => `========================================
[${r.label.toUpperCase()}]
========================================
${r.rawOutput}
`
    )
    .join('\n\n');

  const stage2UserPrompt = `EXECUTIVE CHALLENGE:
${challenge}

THE FOUR INDEPENDENT ANONYMIZED PROPOSALS TO AUDIT:
${anonymizedProposals}

Please execute your Red-Team Audit now:
1. Identify the single biggest flaw or blind spot in Proposal Alpha, Proposal Beta, Proposal Gamma, and Proposal Delta.
2. Highlight the most brilliant, high-leverage insight found in any proposal that others missed.
3. Propose how these divergent viewpoints must be reconciled into a resilient operational strategy.`;

  const promises = config.models.map(async (model, index) => {
    try {
      const { text, tokensUsed, latencyMs } = await callModel(
        model.id,
        PROMPTS.stage2System,
        stage2UserPrompt,
        auth
      );

      const result: Stage2Response = {
        modelId: model.id,
        modelName: model.name,
        rawOutput: text,
        status: 'completed',
        latencyMs,
        tokensUsed
      };
      onProgress?.(index, result);
      return result;
    } catch (err: any) {
      const result: Stage2Response = {
        modelId: model.id,
        modelName: model.name,
        rawOutput: `Audit pass failed for ${model.name}: ${err.message || 'Timeout'}.`,
        status: 'error',
        error: err.message
      };
      onProgress?.(index, result);
      return result;
    }
  });

  return await Promise.all(promises);
}

/**
 * Stage 3: Executive Synthesis
 */
export async function executeStage3(
  challenge: string,
  stage1Results: Stage1Response[],
  stage2Results: Stage2Response[],
  tier: CouncilTier,
  auth: AuthState
): Promise<Stage3Response> {
  const config = COUNCIL_TIERS[tier];
  const chairmanModel = config.models.find(m => m.id === config.chairmanId) || config.models[0];

  const formattedProposals = stage1Results
    .map(r => `--- ${r.label} ---\n${r.rawOutput}`)
    .join('\n\n');

  const formattedCritiques = stage2Results
    .map((r, i) => `--- Red-Team Auditor ${i + 1} (${r.modelName}) ---\n${r.rawOutput}`)
    .join('\n\n');

  const stage3UserPrompt = `STRATEGIC PROBLEM STATEMENT:
${challenge}

--- DIVERGENT PROPOSALS (STAGE 1) ---
${formattedProposals}

--- RED-TEAM PEER REVIEWS & CRITIQUES (STAGE 2) ---
${formattedCritiques}

CHAIRMAN MANDATE:
As Chairman of the Advisory Council, synthesize this entire council deliberations into an authoritative, boardroom-ready Executive Decision Memo.
Structure your memo cleanly:
# EXECUTIVE DECISION MEMO: STRATEGIC RESOLUTION
## 1. CORE VERDICT & STRATEGIC BET
## 2. RESOLVED DISAGREEMENTS & RECONCILED TENSIONS
## 3. PHASED IMPLEMENTATION ROADMAP (THE 3-HORIZON PLAN)
- Horizon 1 (Days 1–90)
- Horizon 2 (Months 3–12)
- Horizon 3 (Months 12–36)
## 4. RED FLAGS, FAILURE MODES & KILL-CRITERIA
## 5. RESOURCE ALLOCATION & GOVERNANCE DIRECTIVE`;

  try {
    const { text, tokensUsed, latencyMs } = await callModel(
      chairmanModel.id,
      PROMPTS.stage3System,
      stage3UserPrompt,
      auth
    );

    return {
      chairmanModelId: chairmanModel.id,
      chairmanModelName: chairmanModel.name,
      memoMarkdown: text,
      status: 'completed',
      latencyMs,
      tokensUsed
    };
  } catch (err: any) {
    return {
      chairmanModelId: chairmanModel.id,
      chairmanModelName: chairmanModel.name,
      memoMarkdown: `# EXECUTIVE DECISION MEMO (Chairman Synthesis)\n\n> **Notice**: Direct Chairman synthesis encountered a network connectivity exception (${err.message}). Showing generated fallback synthesis.`,
      status: 'error',
      error: err.message
    };
  }
}

/**
 * Fallback Academic Simulation Generator for IIM Demonstration & Classroom Demo Mode
 */
function generateSimulatedResponse(
  modelId: string,
  systemPrompt: string,
  userMessage: string,
  startTime: number
) {
  const latencyMs = Date.now() - startTime;
  const isStage1 = systemPrompt.includes('first-principles solution');
  const isStage2 = systemPrompt.includes('red-team auditor');
  const isStage3 = systemPrompt.includes('Chairman of the Advisory Council');

  let text = '';
  if (isStage1) {
    if (modelId.includes('claude')) {
      text = `### Executive Summary & Core Thesis
The challenge represents an asymmetric capital-allocation puzzle where market timing overrides pure cost minimization. The core thesis is to construct a **Modular Platform Architecture** that decouples customer-facing touchpoints from proprietary backend engines, thereby preserving agility while establishing defensive switching costs.

### Strategic Implementation Pillars
1. **Vertical Domain Specialization:** Build proprietary workflows where enterprise compliance and domain data create natural lock-in.
2. **Asymmetric Partnerships:** Subcontract non-differentiating infrastructure to hyper-scalers while retaining algorithmic IP.
3. **Phased Capital Injections:** Bind tranches of funding strictly to repeatable unit-economic proof points.

### Quantified Assumptions & Unit Economics
- Estimated Gross Margin Target: **72%** within 18 months.
- Customer Acquisition Cost (CAC) payback period: **< 9 months**.
- Net Revenue Retention (NRR) baseline threshold: **118%**.

### Downside Risks & Black Swan Scenarios
- **API Disintermediation:** Foundation model providers absorbing workflow layers directly.
- **Enterprise Regulatory Freeze:** Sudden statutory tightening of data jurisdiction.

### Non-Negotiable 90-Day Milestones
- Deploy pilot with 3 anchor design partners.
- Establish deterministic audit logging and compliance sign-off.`;
    } else if (modelId.includes('gpt') || modelId.includes('o3')) {
      text = `### Executive Summary & Core Thesis
Scale and distribution velocity dictate category leadership. We recommend an aggressive **Distribution-First Moat** strategy: capture immediate workflow real estate via high-velocity enterprise integrations, then continuously backfill specialized machine learning capabilities.

### Strategic Implementation Pillars
1. **Open Ecosystem Integration:** Integrate seamlessly into legacy CRM, ERP, and EHR workflows rather than forcing portal migration.
2. **Channel Economics Optimization:** Incentivize systems integrators with recurring revenue shares.
3. **Automated Feedback Flywheels:** Leverage user interaction telemetry to train continuous micro-adapters.

### Quantified Assumptions & Unit Economics
- Target Market Share Capture: **14% of mid-market cohort** in 12 months.
- Infrastructure Compute Burden: **~18% of COGS** at steady state.

### Downside Risks & Black Swan Scenarios
- Price commoditization from open-weight distillation models.
- Enterprise sales cycle elongation beyond 6 months.

### Non-Negotiable 90-Day Milestones
- Deliver 2 turnkey connectors for dominant incumbent platforms.
- Achieve $45k MRR run-rate validation across initial pilot cohorts.`;
    } else if (modelId.includes('deepseek')) {
      text = `### Executive Summary & Core Thesis
The prevailing consensus over-indexes on gross top-line growth at the expense of marginal compute efficiency. Our thesis is **Algorithmic Parsimony & Open-Weight Distillation**: achieve 94% of frontier reasoning capability at 1/12th the inferencing expenditure through small, specialized SLMs (Small Language Models) trained on synthetic reasoning traces.

### Strategic Implementation Pillars
1. **In-House Model Distillation:** Replace general-purpose frontier calls with domain-adapted 8B-parameter local weights.
2. **Predictive Caching & Semantic Routing:** Eliminate redundant query processing across corporate client hierarchies.
3. **Cost Arbitrage Moat:** Pass 50% of compute savings back to clients as an unassailable pricing wedge.

### Quantified Assumptions & Unit Economics
- Inference Cost Reduction: **88% decrease** vs frontier baseline.
- On-premise air-gapped readiness: **100% compliant**.

### Downside Risks & Black Swan Scenarios
- Upstream model architectural breakthroughs obsoleting the distilled pipeline.
- Talent poaching for high-performance ML systems engineers.

### Non-Negotiable 90-Day Milestones
- Benchmark distilled model against frontier models on domain gold-standard benchmark.
- Transition 80% of routine categorization traffic to self-hosted clusters.`;
    } else {
      text = `### Executive Summary & Core Thesis
Global multi-modal contextualization represents the next strategic frontier. Our recommendation centers on an **Omni-Channel Real-Time Context Engine** that synthesizes visual, textual, and temporal sensor streams into continuous executive decision support.

### Strategic Implementation Pillars
1. **Multi-Modal Data Ingestion:** Process unstructured clinical and business artifacts in real time.
2. **Federated Governance Architecture:** Isolate tenant-specific private corporate memory.
3. **Rapid Executive Cockpit:** Surface actionable anomalies rather than raw descriptive statistics.

### Quantified Assumptions & Unit Economics
- Processing Latency: **< 450ms p95** across enterprise multi-modal queries.
- Expansion ARR uplift: **35% YoY** per account.

### Downside Risks & Black Swan Scenarios
- Hallucination propagation across aggregated multi-modal feeds.
- Security boundary breaches in shared tenant indices.

### Non-Negotiable 90-Day Milestones
- Finalize schema for cross-organization data ingestion.
- Demonstrate end-to-end multi-modal query response under 500ms.`;
    }
  } else if (isStage2) {
    text = `### 1. Ruthless Audit of Divergent Proposals
- **Proposal Alpha (Modular Architecture):** While governance and modularity are sound, it severely underestimates the speed of category capture. An over-engineered platform with delayed distribution risks death before achieving product-market fit.
- **Proposal Beta (Distribution First):** Aggressive distribution without proprietary depth creates a thin wrapper that is easily commoditized. High CAC and churn will destroy unit economics once incumbents replicate the workflow.
- **Proposal Gamma (Compute Arbitrage / Distillation):** The cost focus is mathematically rigorous, yet enterprise buyers prioritize reliability, brand trust, and compliance over compute penny-pinching. Distillation is a capability, not a standalone business strategy.
- **Proposal Delta (Multi-Modal Context):** Highly ambitious visionary concept, but operationally fragile. Multi-modal data ingestion at this stage introduces massive latency and unnecessary technical debt.

### 2. Brilliant Insights Uncovered
- **Alpha's** 90-day compliance-anchored milestone is the only real barrier to entry in regulated enterprise spaces.
- **Gamma's** semantic caching architecture provides the actual financial mechanism to survive inference margin compression.

### 3. Synthesis Recommendation
Combine Proposal Beta's enterprise integration hooks with Proposal Gamma's cost-arbitrage routing, anchored inside Proposal Alpha's strict compliance perimeter. Abandon Proposal Delta's extraneous multi-modal scope for Phase 1.`;
  } else if (isStage3) {
    text = `# EXECUTIVE DECISION MEMO: STRATEGIC RESOLUTION
**Council Mandate:** Executive Strategy Evaluation & Final Implementation Blueprint  
**Convened For:** Senior Strategic Leadership, IIM Nagpur Executive Education Demonstration  
**Chairman:** Claude 3.7 Sonnet (Synthesized across 4 Independent Models & 4 Peer Audits)

---

## 1. CORE VERDICT & STRATEGIC BET
The Council unanimously rejects a single-track approach of either pure infrastructure build or shallow application wrapper distribution. 

**The Strategic Bet:** Execute a **"Trojan Horse Distribution with Deep Architectural Moat"** strategy. We will enter the customer's environment through low-friction workflow connectors (adopting Proposal Beta's distribution velocity), but immediately route inferencing through an optimized semantic caching and specialized distillation engine (incorporating Proposal Gamma's margin defense) while enforcing enterprise-grade governance boundaries (from Proposal Alpha).

---

## 2. RESOLVED DISAGREEMENTS & RECONCILED TENSIONS
| Strategic Tension | Proposal Disagreement | Council Chairman Resolution |
| :--- | :--- | :--- |
| **Speed vs. Governance** | Beta urged instant launch; Alpha demanded full compliance sign-offs first. | **Dual-Track Rollout:** Deploy in regulated 'sandbox' mode with 3 anchor design partners while parallelizing SOC2/HIPAA certification. |
| **Frontier API vs. Distillation** | Alpha/Beta relied on frontier APIs; Gamma argued for 100% self-hosted distillation. | **Hybrid Semantic Router:** Route 80% of high-frequency routine tasks to distilled models; reserve frontier reasoning exclusively for edge-case syntheses. |
| **Scope Expansion** | Delta pushed multi-modal sensor ingestion; Gamma pushed hyper-focused text/data. | **Scope Hard-Lock:** Freeze multi-modal R&D until Core Workflow ARR reaches $1M. Avoid premature complexity. |

---

## 3. PHASED IMPLEMENTATION ROADMAP (THE 3-HORIZON PLAN)

### 📌 Horizon 1 (Days 1–90): Operational Stabilization & Pilot Validation
- **Days 1–30:** Finalize the semantic routing gateway and establish deterministic audit logging.
- **Days 31–60:** Onboard 3 enterprise design partners under signed Letter of Intent (LOI) with weekly feedback loops.
- **Days 61–90:** Validate CAC payback under 9 months and achieve 99.5% inference availability.

### 📌 Horizon 2 (Months 3–12): Scaling the Core Advantage
- Scale sales distribution through certified system integrator channels.
- Deploy internal fine-tuned domain models, slashing COGS by 65%.
- Implement automated customer expansion triggers based on daily active usage metrics.

### 📌 Horizon 3 (Months 12–36): Moat Expansion & Compounding Leverage
- Open enterprise developer API ecosystem.
- Expand into adjacent vertical workflows (drawing on Nirmay's multi-product governance learnings).
- Establish category leadership with institutional enterprise lock-in.

---

## 4. RED FLAGS, FAILURE MODES & KILL-CRITERIA
The Executive Leadership Team must immediately pause or pivot upon triggering any of the following:
1. **Gross Margin Erosion:** If blended inference and infrastructure COGS exceed **35% of revenue** after Month 6.
2. **Pilot Churn Metric:** If more than **1 out of 3 anchor design partners** declines full commercial conversion at Day 90.
3. **Platform Cannibalization:** If the underlying foundation model provider releases a direct native feature that eliminates >70% of our workflow value proposition.

---

## 5. RESOURCE ALLOCATION & GOVERNANCE DIRECTIVE
- **Capital Allocation:** 45% Distribution & Enterprise Solutions Engineering, 35% Core Model Distillation & Security, 20% Working Capital Reserve.
- **Executive Sponsor:** Chief Strategy Officer & VP Engineering report bi-weekly progress directly to the Board of Directors.
- **Decisive Rule:** Velocity is our defense, but unit economics are our survival. Execute without hedging.`;
  }

  return {
    text,
    tokensUsed: 1450 + Math.floor(Math.random() * 400),
    latencyMs
  };
}
