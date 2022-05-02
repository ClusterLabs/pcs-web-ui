import { ClusterAddActions } from "./add";
import { ClusterFixAuthActions } from "./fixAuth";
import { ClusterListActions } from "./list";
import { ClusterPermissionsActions } from "./permissions";
import { ClusterPropertiesActions } from "./properties";
import { ClusterSbdActions } from "./sbd";
import { ClusterStatusActions } from "./status";
import { ClusterTaskActions } from "./task";
import { ClusterNVPairListActions } from "./nvpairList";

// prettier-ignore
export type ClusterActions = (
  & ClusterAddActions
  & ClusterFixAuthActions
  & ClusterListActions
  & ClusterPermissionsActions
  & ClusterPropertiesActions
  & ClusterSbdActions
  & ClusterStatusActions
  & ClusterTaskActions
  & ClusterNVPairListActions
);
