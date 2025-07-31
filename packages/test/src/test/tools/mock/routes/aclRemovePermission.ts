import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

type AclRemovePermission = LibClusterCommandPayload["acl-remove-permission"];

export const aclRemovePermission = ({
  clusterName,
  permissionId,
  response,
}: {
  clusterName: string;
  permissionId: AclRemovePermission["permission_id"];
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "acl-remove-permission",
    payload: {
      permission_id: permissionId,
    },
    response,
  });
