import {NodeAddActions} from "./add";
import {NodeAuthActions} from "./auth";
import {NodeActionActions} from "./action";
import {NodeStopActions} from "./stop";

// prettier-ignore
export type NodeActions = (
  & NodeActionActions
  & NodeAddActions
  & NodeAuthActions
  & NodeStopActions
);
