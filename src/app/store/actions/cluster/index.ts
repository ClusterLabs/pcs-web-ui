import { ClusterAddActions } from "./add";
import { ClusterStatusActions } from "./status";
import { ClusterPropertiesActions } from "./properties";
import { ClusterWizardActions } from "./wizard";
import { ClusterListActions } from "./list";

// prettier-ignore
export type ClusterActions = (
  & ClusterAddActions
  & ClusterListActions
  & ClusterPropertiesActions
  & ClusterStatusActions
  & ClusterWizardActions
);
