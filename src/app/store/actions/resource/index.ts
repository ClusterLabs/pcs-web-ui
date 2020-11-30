import { ResourceCreateActions } from "./create";
import { ResourceTreeActions } from "./tree";
import { ResourceActionsActions } from "./actions";

// prettier-ignore
export type ResourceActions = (
  & ResourceCreateActions
  & ResourceTreeActions
  & ResourceActionsActions
);
