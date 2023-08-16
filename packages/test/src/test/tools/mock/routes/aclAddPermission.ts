import {RouteResponse} from "../mock";

import {LibClusterCommandPayload, libCluster} from "./libCluster";

type AclAddPermission = LibClusterCommandPayload["acl-add-permission"];

export const aclAddPermission = ({
  clusterName,
  roleId,
  permissionInfoList,
  response,
}: {
  clusterName: string;
  roleId: AclAddPermission["role_id"];
  permissionInfoList: AclAddPermission["permission_info_list"];
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "acl-add-permission",
    payload: {
      role_id: roleId,
      permission_info_list: permissionInfoList,
    },
    response,
  });
