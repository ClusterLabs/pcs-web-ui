import {RouteResponse} from "test/tools/interception";

import {LibClusterCommandPayload, libCluster} from "./libCluster";

type AclRoleCreatePayload = LibClusterCommandPayload["acl-create-role"];

export const aclRoleCreate = ({
  clusterName,
  roleId,
  permissionInfoList,
  description,
  response,
}: {
  clusterName: string;
  roleId: AclRoleCreatePayload["role_id"];
  permissionInfoList: AclRoleCreatePayload["permission_info_list"];
  description: AclRoleCreatePayload["description"];
  response?: RouteResponse;
}) =>
  libCluster({
    clusterName,
    name: "acl-create-role",
    payload: {
      role_id: roleId,
      permission_info_list: permissionInfoList,
      description,
    },
    response,
  });
