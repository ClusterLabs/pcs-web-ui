import {RouteResponse} from "../interception";

import {LibClusterCommandPayload, libCluster} from "./libCluster";

type Payload = LibClusterCommandPayload["acl-assign-role-to-group"];

export const aclAssignRoleToGroup = ({
  clusterName,
  roleId,
  groupId,
  response,
}: {
  clusterName: string;
  roleId: Payload["role_id"];
  groupId: Payload["group_id"];
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "acl-assign-role-to-group",
    payload: {
      role_id: roleId,
      group_id: groupId,
    },
    response,
  });
