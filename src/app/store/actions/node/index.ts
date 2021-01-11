import { NodeAddActions } from "./add";
import { NodeAuthActions } from "./auth";
import { NodeActionActions } from "./action";

// prettier-ignore
export type NodeActions = (
  & NodeActionActions
  & NodeAddActions
  & NodeAuthActions
);
