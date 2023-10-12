import React from "react";

import {ClusterTasks} from "app/store";
import * as resourceTask from "app/view/cluster/resources/task";
import * as permissionTask from "app/view/cluster/permissions/task";
import * as aclTask from "app/view/cluster/acl/task";
import * as aclDetailTask from "app/view/cluster/acl/detail/task";
import * as constraintTask from "app/view/cluster/constraints/task";
import * as primitiveTask from "app/view/cluster/resources/primitive/task";
import * as nodesTask from "app/view/cluster/nodes/task";
import * as sbdTask from "app/view/cluster/sbd/task";
import * as fenceDeviceTask from "app/view/cluster/fenceDevices/task";
import * as fenceDeviceArgumentsTask from "app/view/cluster/fenceDevices/arguments/task";
import * as nvpairTask from "app/view/cluster/share/nvpair/task";

export const taskMap = {
  aclRoleCreate: aclTask.createRole.Task,
  aclRolePermissionAdd: aclDetailTask.addPermissionToRole.Task,
  aclSubjectAssign: aclDetailTask.assignSubjectToRole.Task,
  aclSubjectCreate: aclTask.createSubject.Task,
  constraintColocationCreate: constraintTask.createColocation.Task,
  constraintColocationSetCreate: constraintTask.createColocationSet.Task,
  constraintLocationCreate: constraintTask.createLocation.Task,
  constraintOrderCreate: constraintTask.createOrder.Task,
  constraintOrderSetCreate: constraintTask.createOrderSet.Task,
  constraintTicketCreate: constraintTask.createTicket.Task,
  constraintTicketSetCreate: constraintTask.createTicketSet.Task,
  fenceDeviceArgsEdit: fenceDeviceArgumentsTask.editArgs.EditArgsTask,
  fenceDeviceCreate: fenceDeviceTask.create.FenceDeviceCreate,
  nodeAdd: nodesTask.add.NodeAdd,
  nvpairEdit: nvpairTask.edit.Task,
  permissionEdit: permissionTask.add.PermissionTask,
  primitiveGroupChange: primitiveTask.groupChange.Task,
  resourceCreate: resourceTask.create.ResourceCreate,
  resourceGroup: resourceTask.createGroup.ResourceCreateGroup,
  sbdConfigure: sbdTask.configure.SbdConfigureTask,
  sbdDisable: sbdTask.disable.SbdDisableTask,
  // fixAuth: ,
} satisfies Record<
  Exclude<ClusterTasks[number], "fixAuth">,
  React.FunctionComponent
>;
