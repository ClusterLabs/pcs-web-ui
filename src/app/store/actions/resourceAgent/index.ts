import { ResourceAgentAgentActions } from "./agent";
import { ResourceAgentListActions } from "./list";

// prettier-ignore
export type ResourceAgentActions = (
  & ResourceAgentAgentActions
  & ResourceAgentListActions
);
