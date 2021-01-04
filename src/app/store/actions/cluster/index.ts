import { ClusterAddActions } from "./add";
import { ClusterFixAuthActions } from "./fixAuth";
import { ClusterListActions } from "./list";
import { ClusterPropertiesActions } from "./properties";
import { ClusterStatusActions } from "./status";
import { ClusterWizardActions } from "./wizard";

// prettier-ignore
export type ClusterActions = (
  & ClusterAddActions
  & ClusterFixAuthActions
  & ClusterListActions
  & ClusterPropertiesActions
  & ClusterStatusActions
  & ClusterWizardActions
);
