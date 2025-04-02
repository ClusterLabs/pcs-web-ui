import type {ResourceCreateActions} from "./create";
import type {ResourceDeleteActions} from "./delete";
import type {ResourceMoveActions} from "./move";
import type {ResourceBanActions} from "./ban";
import type {ResourceClearActions} from "./clear";
import type {ResourceActionsActions} from "./actions";
import type {ResourceGroupCreateActions} from "./groupCreate";
import type {ResourceSetActions} from "./resourceSet";
import type {ResourceGroupChangeActions} from "./groupChange";

// biome-ignore format:
export type ResourceActions = (
  & ResourceCreateActions
  & ResourceDeleteActions
  & ResourceMoveActions
  & ResourceBanActions
  & ResourceClearActions
  & ResourceGroupCreateActions
  & ResourceActionsActions
  & ResourceSetActions
  & ResourceGroupChangeActions
);
