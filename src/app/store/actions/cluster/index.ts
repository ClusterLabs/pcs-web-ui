import { ClusterAddActions } from "./add";
import { ClusterFixAuthActions } from "./fixAuth";
import { ClusterListActions } from "./list";
import { ClusterPropertiesActions } from "./properties";
import { ClusterPermissionsActions } from "./permissions";
import { ClusterStatusActions } from "./status";
import { ClusterTaskActions } from "./task";
import { ClusterUtilizationActions } from "./utilization";

// prettier-ignore
export type ClusterActions = (
  & ClusterAddActions
  & ClusterFixAuthActions
  & ClusterListActions
  & ClusterPropertiesActions
  & ClusterPermissionsActions
  & ClusterStatusActions
  & ClusterTaskActions
  & ClusterUtilizationActions
);
