export interface FenceAgentParameter {
  name: string;
  shortdesc: string;
  longdesc: string;
  default: string | number | null;
}

export interface FenceAgentMetadata {
  loadStatus: "LOADING" | "LOADED" | "RELOADING" | "FAILED";
  shortdesc: string;
  longdesc: string;
  parameters: FenceAgentParameter[];
}

export interface FenceState {
  storage: Record<string, FenceAgentMetadata>;
}
