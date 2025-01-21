import type {ClusterAddActions} from "./add";
import type {ClusterFixAuthActions} from "./fixAuth";
import type {ClusterListActions} from "./list";
import type {ClusterPermissionsActions} from "./permissions";
import type {ClusterPropertiesActions} from "./properties";
import type {ClusterSbdActions} from "./sbd";
import type {ClusterStatusActions} from "./status";
import type {ClusterTaskActions} from "./task";
import type {ClusterNVPairListActions} from "./nvpairList";
import type {ClusterAclActions} from "./acl";
import type {ClusterStopActions} from "./stop";

// biome-ignore format:
export type ClusterActions = (
  & ClusterAclActions
  & ClusterAddActions
  & ClusterFixAuthActions
  & ClusterListActions
  & ClusterPermissionsActions
  & ClusterPropertiesActions
  & ClusterSbdActions
  & ClusterStatusActions
  & ClusterStopActions
  & ClusterTaskActions
  & ClusterNVPairListActions
);
