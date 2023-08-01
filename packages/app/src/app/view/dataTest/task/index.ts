import {aclRoleAddPermission} from "./aclRoleAddPermission";
import {nodeAdd} from "./nodeAdd";
import {aclRoleCreate} from "./aclRoleCreate";
import {fenceDeviceCreate} from "./fenceDeviceCreate";
import {resourceCreate} from "./resourceCreate";
import {clusterImportExisting} from "./clusterImportExisting";
import {clusterSetup} from "./clusterSetup";

export const task = {
  aclRoleAddPermission,
  aclRoleCreate,
  clusterImportExisting,
  clusterSetup,
  fenceDeviceCreate,
  nodeAdd,
  resourceCreate,
};
