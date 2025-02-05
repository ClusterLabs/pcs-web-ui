import type {ResourceAgentAgentActions} from "./agent";
import type {ResourceAgentListActions} from "./list";

// biome-ignore format:
export type ResourceAgentActions = (
  & ResourceAgentAgentActions
  & ResourceAgentListActions
);
