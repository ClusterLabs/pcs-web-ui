import type {FenceAgentAgentActions} from "./agent";
import type {FenceAgentListActions} from "./list";

// biome-ignore format:
export type FenceAgentActions = (
  & FenceAgentAgentActions
  & FenceAgentListActions
);
