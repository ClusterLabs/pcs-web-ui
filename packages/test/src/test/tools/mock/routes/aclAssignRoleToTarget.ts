import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

type Payload = LibClusterCommandPayload["acl-assign-role-to-target"];

export const aclAssignRoleToTarget = ({
  roleId,
  targetId,
  response,
}: {
  roleId: Payload["role_id"];
  targetId: Payload["target_id"];
  response?: RouteResponse;
}) =>
  libCluster({
    name: "acl-assign-role-to-target",
    payload: {
      role_id: roleId,
      target_id: targetId,
    },
    response,
  });
