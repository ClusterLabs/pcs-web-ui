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

export type AddClusterActions = AddClusterActions;
export type AuthActions = AuthActions;
export type ClusterActions = ClusterActions;
export type LoginActions = LoginActions;
export type NotificationActions = NotificationActions;
export type ResourceDetailActions = ResourceDetailActions;
export type PrimitiveResourceActions = PrimitiveResourceActions;

type Union<A> = A[keyof A];

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
);

export type SetupDataReading = {
    type: "DATA_READING.SET_UP",
    payload: Record<string, {
      start: LeafAction,
      stop: LeafAction,
      specificator?: any,
    }>,
}

export type Action = LeafAction|SetupDataReading;

export const actionType = (value: Action["type"]) => value;
