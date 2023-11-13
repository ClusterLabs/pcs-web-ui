import React from "react";

import {selectors} from "app/store";

import {ClusterSetup} from "./clusterSetup";
import {ClusterStop} from "./clusterStop";
import {ClusterImportExisting} from "./clusterImportExisting";
import {AclAssignSubjectToRole} from "./aclAssignSubjectToRole";
import {AclRoleCreate} from "./aclRoleCreate";
import {AclRoleAddPermission} from "./aclRoleAddPermission";
import {AclSubjectCreate} from "./aclSubjectCreate";
import {ConstraintColocationCreate} from "./constraintColocationCreate";
import {ConstraintColocationSetCreate} from "./constraintColocationSetCreate";
import {ConstraintLocationCreate} from "./constraintLocationCreate";
import {ConstraintOrderCreate} from "./constraintOrderCreate";
import {ConstraintOrderSetCreate} from "./constraintOrderSetCreate";
import {ConstraintTicketCreate} from "./constraintTicketCreate";
import {ConstraintTicketSetCreate} from "./constraintTicketSetCreate";
import {FenceDeviceArgumentsEdit} from "./fenceDeviceArgumentsEdit";
import {FenceDeviceCreate} from "./fenceDeviceCreate";
import {NodeAdd} from "./nodeAdd";
import {NodeStop} from "./nodeStop";
import {NvPairEdit} from "./nvpairEdit";
import {PermissionEdit} from "./permissionEdit";
import {ResourcePrimitiveGroupChange} from "./resourcePrimitiveGroupChange";
import {ResourceCreate} from "./resourceCreate";
import {ResourceMove} from "./resourceMove";
import {ResourceBan} from "./resourceBan";
import {ResourceGroupCreate} from "./resourceGroupCreate";
import {SbdConfigure} from "./sbdConfigure";
import {SbdDisable} from "./sbdDisable";
import {FixAuth} from "./fixAuth";

type TaskNames = Parameters<typeof selectors.getTask>[0];

export const taskMap = {
  clusterSetup: ClusterSetup,
  clusterStop: ClusterStop,
  importExistingCluster: ClusterImportExisting,
  aclRoleCreate: AclRoleCreate,
  aclRolePermissionAdd: AclRoleAddPermission,
  aclSubjectAssign: AclAssignSubjectToRole,
  aclSubjectCreate: AclSubjectCreate,
  constraintColocationCreate: ConstraintColocationCreate,
  constraintColocationSetCreate: ConstraintColocationSetCreate,
  constraintLocationCreate: ConstraintLocationCreate,
  constraintOrderCreate: ConstraintOrderCreate,
  constraintOrderSetCreate: ConstraintOrderSetCreate,
  constraintTicketCreate: ConstraintTicketCreate,
  constraintTicketSetCreate: ConstraintTicketSetCreate,
  fenceDeviceArgsEdit: FenceDeviceArgumentsEdit,
  fenceDeviceCreate: FenceDeviceCreate,
  nodeAdd: NodeAdd,
  nodeStop: NodeStop,
  nvpairEdit: NvPairEdit,
  permissionEdit: PermissionEdit,
  primitiveGroupChange: ResourcePrimitiveGroupChange,
  resourceCreate: ResourceCreate,
  resourceMove: ResourceMove,
  resourceBan: ResourceBan,
  resourceGroup: ResourceGroupCreate,
  sbdConfigure: SbdConfigure,
  sbdDisable: SbdDisable,
  fixAuth: FixAuth,
} satisfies Record<TaskNames, React.FunctionComponent>;
