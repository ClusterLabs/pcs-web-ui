export interface ResourceAgentParameter {
  name: string;
  shortdesc: string;
  longdesc: string;
  default: string | number | null;
}

export interface ResourceAgentMetadata {
  loadStatus: "LOADING" | "LOADED" | "RELOADING" | "FAILED";
  shortdesc: string;
  longdesc: string;
  parameters: ResourceAgentParameter[];
}

export interface ResourcePrimitiveState {
  storage: Record<string, ResourceAgentMetadata>;
}
