import { AddClusterActions } from "app/scenes/dashboard-add-cluster/actions";
import { AuthActions } from "app/services/auth/actions";
import { ClusterActions } from "app/services/cluster/actions";
import { DashboardActions } from "app/scenes/dashboard/actions";
import { DataLoadActions } from "app/services/data-load/actions";
import { LoginActions } from "app/scenes/login/actions";
import { NotificationActions } from "app/scenes/notifications/actions";
import { ResourceDetailActions } from "app/scenes/resource-detail/actions";
import { ResourceTreeActions } from "app/scenes/resource-tree/actions";
import { UsernameActions } from "app/services/username/actions";
import {
  PrimitiveResourceActions,
} from "app/scenes/resource-primitive/actions";


type Union<A> = A[keyof A];

export type Action = (
  | Union<AddClusterActions>
  | Union<AuthActions>
  | Union<ClusterActions>
  | Union<DashboardActions>
  | Union<DataLoadActions>
  | Union<LoginActions>
  | Union<NotificationActions>
  | Union<ResourceDetailActions>
  | Union<ResourceTreeActions>
  | Union<UsernameActions>
  | Union<PrimitiveResourceActions>
);

export function actionType(value: Action["type"]) {
  return value;
}
