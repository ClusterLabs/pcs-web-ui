import {aclAssignSubjectToRole} from "./aclAssignSubjectToRole";
import {aclRoleAddPermission} from "./aclRoleAddPermission";
import {aclRoleCreate} from "./aclRoleCreate";
import {clusterImportExisting} from "./clusterImportExisting";
import {clusterSetup} from "./clusterSetup";
import {fenceDeviceCreate} from "./fenceDeviceCreate";
import {nodeAdd} from "./nodeAdd";
import {resourceCreate} from "./resourceCreate";

export const task = {
  aclAssignSubjectToRole,
  aclRoleAddPermission,
  aclRoleCreate,
  clusterImportExisting,
  clusterSetup,
  fenceDeviceCreate,
  nodeAdd,
  resourceCreate,
};
