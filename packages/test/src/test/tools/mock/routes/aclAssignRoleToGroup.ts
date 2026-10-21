import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

type Payload = LibClusterCommandPayload["acl-assign-role-to-group"];

export const aclAssignRoleToGroup = ({
  roleId,
  groupId,
  response,
}: {
  roleId: Payload["role_id"];
  groupId: Payload["group_id"];
  response?: RouteResponse;
}) =>
  libCluster({
    name: "acl-assign-role-to-group",
    payload: {
      role_id: roleId,
      group_id: groupId,
    },
    response,
  });
