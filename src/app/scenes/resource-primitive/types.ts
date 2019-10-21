export interface ResourceAgentParameter {
  name: string;
  shortdesc: string;
  longdesc: string;
  default: string|null;
}

export interface ResourceAgentMetadata {
  loadStatus: "LOADING"|"LOADED"|"RELOADING"|"FAILED";
  parameters: ResourceAgentParameter[];
}

export interface ResourcePrimitiveState {
  storage: Record<string, ResourceAgentMetadata >;
}
