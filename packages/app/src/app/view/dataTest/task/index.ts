import {aclAssignSubjectToRole} from "./aclAssignSubjectToRole";
import {aclRoleAddPermission} from "./aclRoleAddPermission";
import {aclRoleCreate} from "./aclRoleCreate";
import {clusterImportExisting} from "./clusterImportExisting";
import {clusterSetup} from "./clusterSetup";
import {constraintTicketCreate} from "./constraintTicketCreate";
import {fenceDeviceCreate} from "./fenceDeviceCreate";
import {nodeAdd} from "./nodeAdd";
import {resourceCreate} from "./resourceCreate";
import {sbdDisable} from "./sbdDisable";

export const task = {
  aclAssignSubjectToRole,
  aclRoleAddPermission,
  aclRoleCreate,
  clusterImportExisting,
  clusterSetup,
  constraintTicketCreate,
  fenceDeviceCreate,
  nodeAdd,
  resourceCreate,
  sbdDisable,
};
