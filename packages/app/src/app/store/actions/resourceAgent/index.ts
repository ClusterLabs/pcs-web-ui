import type {ResourceAgentAgentActions} from "./agent";
import type {ResourceAgentListActions} from "./list";

// biome-ignore format: this is better formating
export type ResourceAgentActions = (
  & ResourceAgentAgentActions
  & ResourceAgentListActions
);
