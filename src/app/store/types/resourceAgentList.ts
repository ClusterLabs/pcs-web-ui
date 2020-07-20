export type ResourceAgentMap = Record<string, string[]>;
export type ResourceAgentListService = {
  data: ResourceAgentMap;
  fetchState: {
    current: "NOT_STARTED" | "LOADING" | "LOADED" | "RELOADING" | "FAILED";
    alreadyLoaded: boolean;
  };
};
