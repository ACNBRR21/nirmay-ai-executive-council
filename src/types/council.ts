export type CouncilTier = 'medium' | 'heavy';

export type AccessMode = 'byok' | 'prepaid' | 'demo';

export interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  shortDesc: string;
  tag: string;
  badgeColor: string;
}

export interface CouncilConfig {
  tier: CouncilTier;
  chairmanId: string;
  models: ModelConfig[];
}

export interface Stage1Response {
  modelId: string;
  modelName: string;
  label: 'Proposal Alpha' | 'Proposal Beta' | 'Proposal Gamma' | 'Proposal Delta';
  rawOutput: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  latencyMs?: number;
  tokensUsed?: number;
  error?: string;
}

export interface Stage2Response {
  modelId: string;
  modelName: string;
  rawOutput: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  latencyMs?: number;
  tokensUsed?: number;
  error?: string;
}

export interface Stage3Response {
  chairmanModelId: string;
  chairmanModelName: string;
  memoMarkdown: string;
  status: 'pending' | 'running' | 'completed' | 'error';
  latencyMs?: number;
  tokensUsed?: number;
  error?: string;
}

export interface CouncilSession {
  id: string;
  timestamp: string;
  challenge: string;
  tier: CouncilTier;
  accessMode: AccessMode;
  currentStage: 0 | 1 | 2 | 3; // 0 = idle, 1 = divergence, 2 = peer review, 3 = synthesis
  isProcessing: boolean;
  stage1Results: Stage1Response[];
  stage2Results: Stage2Response[];
  stage3Result?: Stage3Response;
  totalTokens?: number;
  totalLatencyMs?: number;
  error?: string;
}

export interface AuthState {
  mode: AccessMode;
  apiKey: string;
  passcode: string;
  proxyUrl: string;
  isConfigured: boolean;
}
