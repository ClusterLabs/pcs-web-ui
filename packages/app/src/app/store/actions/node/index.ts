import type {NodeAddActions} from "./add";
import type {NodeAuthActions} from "./auth";
import type {NodeActionActions} from "./action";
import type {NodeStopActions} from "./stop";

// biome-ignore format: this is better formating
export type NodeActions = (
  & NodeActionActions
  & NodeAddActions
  & NodeAuthActions
  & NodeStopActions
);
