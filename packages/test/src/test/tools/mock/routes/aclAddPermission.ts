import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

type AclAddPermission = LibClusterCommandPayload["acl-add-permission"];

export const aclAddPermission = ({
  roleId,
  permissionInfoList,
  response,
}: {
  roleId: AclAddPermission["role_id"];
  permissionInfoList: AclAddPermission["permission_info_list"];
  response?: RouteResponse;
}) =>
  libCluster({
    name: "acl-add-permission",
    payload: {
      role_id: roleId,
      permission_info_list: permissionInfoList,
    },
    response,
  });
