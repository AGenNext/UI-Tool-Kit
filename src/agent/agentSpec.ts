export type AgentKind = 'coding' | 'research' | 'browser' | 'workflow' | 'custom';
export type ProviderMode = 'agennext-router' | 'hosted' | 'local' | 'openai-compatible' | 'custom';
export type ToolPermission = 'read' | 'write' | 'execute' | 'network' | 'browser' | 'approve';
export type ToolRisk = 'low' | 'medium' | 'high' | 'critical';

export interface AgentEnvironmentSpec {
  environment: 'development' | 'staging' | 'production';
  apiBaseUrl?: string;
  agentRuntimeUrl?: string;
  telemetryEnabled?: boolean;
}

export interface AgentModelSpec {
  providerMode: ProviderMode;
  preferredModel?: string;
  modelRouterUrl?: string;
  modelRouterPolicy?: 'balanced' | 'cheapest' | 'fastest' | 'safest' | string;
  llmBaseUrl?: string;
  llmApiKeySecretRef?: string;
}

export interface AgentToolSpec {
  id: string;
  name: string;
  kind: 'native' | 'mcp' | 'browser' | 'github' | 'terminal' | 'filesystem' | 'deployment' | 'custom';
  enabled: boolean;
  description?: string;
  permissions?: ToolPermission[];
  risk?: ToolRisk;
  endpoint?: string;
  requiresApproval?: boolean;
}

export interface AgentProfileSpec {
  displayName: string;
  role?: string;
  organization?: string;
  codingStyle?: 'fast' | 'balanced' | 'safe' | string;
}

export interface CodifiableAgentSpec {
  id: string;
  name: string;
  kind: AgentKind;
  description?: string;
  profile: AgentProfileSpec;
  model: AgentModelSpec;
  environment: AgentEnvironmentSpec;
  tools: AgentToolSpec[];
  prompts?: {
    system?: string;
    task?: string;
    policy?: string;
  };
  capabilities?: string[];
  constraints?: string[];
}

export const defaultCodingAgentTools: AgentToolSpec[] = [
  {
    id: 'github',
    name: 'GitHub Tool',
    kind: 'github',
    enabled: true,
    permissions: ['read', 'write'],
    risk: 'medium',
    description: 'Read repositories, create branches, edit files, commits, issues, and pull requests.',
    requiresApproval: true,
  },
  {
    id: 'browser',
    name: 'Browser Tool',
    kind: 'browser',
    enabled: true,
    permissions: ['browser', 'network', 'read'],
    risk: 'medium',
    description: 'Search web, open pages, inspect documentation, and capture browser context.',
    requiresApproval: false,
  },
  {
    id: 'terminal',
    name: 'Terminal Tool',
    kind: 'terminal',
    enabled: false,
    permissions: ['execute'],
    risk: 'high',
    description: 'Run commands, tests, linters, and build steps in a sandbox.',
    requiresApproval: true,
  },
  {
    id: 'filesystem',
    name: 'File System Tool',
    kind: 'filesystem',
    enabled: true,
    permissions: ['read', 'write'],
    risk: 'high',
    description: 'Read and write files in an approved workspace.',
    requiresApproval: true,
  },
  {
    id: 'mcp',
    name: 'MCP Connector',
    kind: 'mcp',
    enabled: true,
    permissions: ['read', 'write', 'network'],
    risk: 'medium',
    description: 'Connect external tools through Model Context Protocol servers.',
    requiresApproval: true,
  },
];

export const defaultCodingAgentSpec: CodifiableAgentSpec = {
  id: 'coding-agent-default',
  name: 'Coding Agent',
  kind: 'coding',
  description: 'A codifiable coding agent that can inspect repositories, propose patches, run checks, and prepare pull requests through the platform runtime.',
  profile: {
    displayName: 'Coding Agent',
    role: 'developer',
    codingStyle: 'balanced',
  },
  model: {
    providerMode: 'agennext-router',
    preferredModel: 'agennext-router:auto',
    modelRouterUrl: 'http://localhost:8080',
    modelRouterPolicy: 'balanced',
  },
  environment: {
    environment: 'development',
    apiBaseUrl: 'http://localhost:8000',
    agentRuntimeUrl: 'http://localhost:8000',
    telemetryEnabled: false,
  },
  tools: defaultCodingAgentTools,
  capabilities: [
    'repo_inspection',
    'patch_generation',
    'test_execution_request',
    'pull_request_preparation',
    'documentation_lookup',
  ],
  constraints: [
    'ask_approval_before_write',
    'ask_approval_before_execute',
    'do_not_store_plaintext_api_keys',
  ],
};
