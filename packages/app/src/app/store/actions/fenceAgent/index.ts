import type {FenceAgentAgentActions} from "./agent";
import type {FenceAgentListActions} from "./list";

// biome-ignore format: this is better formating
export type FenceAgentActions = (
  & FenceAgentAgentActions
  & FenceAgentListActions
);
