import { selectors } from "app/store";

export type Agent = selectors.ExtractClusterSelector<
  typeof selectors.getPcmkAgent
>;

export type AgentParameter = Agent["parameters"][number];
