import { AddClusterActions } from "./dashboard-add-cluster";
import { AuthActions } from "./auth";
import { ClusterActions } from "./cluster";
import { DashboardActions } from "./dashboard";
import { LoginActions } from "./login";
import { NotificationActions } from "./notifications";
import { ResourceDetailActions } from "./resource-detail";
import { ResourceTreeActions } from "./resource-tree";
import { UsernameActions } from "./username";
import { PrimitiveResourceActions } from "./resource-primitive";
import { NodeActions } from "./node";
import { ResourceAgentActions } from "./resource-agent";
import { FenceAgentActions } from "./fence-agent";
import { ClusterPropertiesActions } from "./clusterProperties";
import { ResourceAgentListActions } from "./resourceAgentList";
import { ClusterWizard } from "./clusterWizard";
import { LibActions } from "./lib";

type Union<A> = A[keyof A];

// prettier-ignore
export type LeafAction = (
  | Union<AddClusterActions>
  | Union<AuthActions>
  | Union<ClusterActions>
  | Union<DashboardActions>
  | Union<LoginActions>
  | Union<NotificationActions>
  | Union<ResourceDetailActions>
  | Union<ResourceTreeActions>
  | Union<UsernameActions>
  | Union<PrimitiveResourceActions>
  | Union<ResourceAgentActions>
  | Union<FenceAgentActions>
  | Union<ClusterPropertiesActions>
  | Union<ResourceAgentListActions>
  | Union<NodeActions>
  | Union<LibActions>
  | Union<ClusterWizard>
);

export type SetupDataReading = {
  type: "DATA_READING.SET_UP";
  payload: {
    specificator: string;
    start: LeafAction;
    stop: LeafAction;
  }[];
};
