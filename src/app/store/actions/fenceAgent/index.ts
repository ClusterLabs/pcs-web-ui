import { FenceAgentAgentActions } from "./agent";
import { FenceAgentListActions } from "./list";

// prettier-ignore
export type FenceAgentActions = (
  & FenceAgentAgentActions
  & FenceAgentListActions
);
