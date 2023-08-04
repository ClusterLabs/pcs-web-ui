import {aclAssignSubjectToRole} from "./aclAssignSubjectToRole";
import {aclRoleAddPermission} from "./aclRoleAddPermission";
import {aclRoleCreate} from "./aclRoleCreate";
import {clusterImportExisting} from "./clusterImportExisting";
import {clusterSetup} from "./clusterSetup";
import {constraintLocationCreate} from "./constraintLocationCreate";
import {constraintOrderCreate} from "./constraintOrderCreate";
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
  constraintLocationCreate,
  constraintOrderCreate,
  constraintTicketCreate,
  fenceDeviceCreate,
  nodeAdd,
  resourceCreate,
  sbdDisable,
};
