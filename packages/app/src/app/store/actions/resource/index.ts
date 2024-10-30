import {ResourceCreateActions} from "./create";
import {ResourceMoveActions} from "./move";
import {ResourceBanActions} from "./ban";
import {ResourceClearActions} from "./clear";
import {ResourceActionsActions} from "./actions";
import {ResourceGroupCreateActions} from "./groupCreate";
import {ResourceSetActions} from "./resourceSet";
import {ResourceGroupChangeActions} from "./groupChange";

// prettier-ignore
export type ResourceActions = (
  & ResourceCreateActions
  & ResourceMoveActions
  & ResourceBanActions
  & ResourceClearActions
  & ResourceGroupCreateActions
  & ResourceActionsActions
  & ResourceSetActions
  & ResourceGroupChangeActions
);
