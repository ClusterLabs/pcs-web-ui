import { ResourceCreateActions } from "./create";
import { ResourceTreeActions } from "./tree";
import { ResourceActionsActions } from "./actions";
import { ResourceGroupCreateActions } from "./groupCreate";

// prettier-ignore
export type ResourceActions = (
  & ResourceCreateActions
  & ResourceGroupCreateActions
  & ResourceTreeActions
  & ResourceActionsActions
);
