import { types as cluster } from "./cluster";
import * as dashboard from "./dashboard/types";
import * as addCluster from "./dashboard-add-cluster/types";
import { Notification } from "./notifications/types";
import * as resourceAgents from "./resourceAgents/types";

export type Notification = Notification;

export {
  cluster,
  dashboard,
  addCluster,
  resourceAgents,
};
