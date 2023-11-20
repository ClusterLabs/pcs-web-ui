/* eslint-disable import/max-dependencies */
import {ClusterAddActions} from "./add";
import {ClusterFixAuthActions} from "./fixAuth";
import {ClusterListActions} from "./list";
import {ClusterPermissionsActions} from "./permissions";
import {ClusterPropertiesActions} from "./properties";
import {ClusterSbdActions} from "./sbd";
import {ClusterStatusActions} from "./status";
import {ClusterTaskActions} from "./task";
import {ClusterNVPairListActions} from "./nvpairList";
import {ClusterAclActions} from "./acl";
import {ClusterStopActions} from "./stop";

// prettier-ignore
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
