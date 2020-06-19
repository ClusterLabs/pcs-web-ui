export interface AgentParameter {
  name: string;
  shortdesc: string;
  longdesc: string;
  default: string | number | null;
}

export interface Agent {
  loadStatus: "LOADING" | "LOADED" | "RELOADING" | "FAILED";
  shortdesc: string;
  longdesc: string;
  parameters: AgentParameter[];
}

export type ResourceAgentParameter = AgentParameter;
export type ResourceAgent = Agent;
export type ResourceAgentsStorage = Record<string, ResourceAgent>;

export type FenceAgentParameter = AgentParameter;
export type FenceAgent = Agent;
export type FenceAgentsStorage = Record<string, FenceAgent>;

export type AgentsStorage = ResourceAgentsStorage | FenceAgentsStorage;
