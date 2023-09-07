import {TaskForceableConfirmActions} from "./forceableConfirm";
import {TaskOpenCloseActions} from "./taskOpenClose";

// prettier-ignore
export type TaskActions = (
  & TaskForceableConfirmActions
  & TaskOpenCloseActions
);
