import {ResourceCreateActions} from "./create";
import {ResourceTreeActions} from "./tree";
import {ResourceActionsActions} from "./actions";
import {ResourceGroupCreateActions} from "./groupCreate";
import {ResourceSetActions} from "./resourceSet";
import {ResourceGroupChangeActions} from "./groupChange";

// prettier-ignore
export type ResourceActions = (
  & ResourceCreateActions
  & ResourceGroupCreateActions
  & ResourceTreeActions
  & ResourceActionsActions
  & ResourceSetActions
  & ResourceGroupChangeActions
);
