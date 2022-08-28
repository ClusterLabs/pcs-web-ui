import { libCallCluster } from "app/backend";

type AclCreateRolePayload = Extract<
  Parameters<typeof libCallCluster>[0]["command"],
  { name: "acl-create-role" }
>["payload"];

type AclRoleCreate = {
  roleId: AclCreateRolePayload["role_id"];
  permissionInfoList: AclCreateRolePayload["permission_info_list"];
  description: AclCreateRolePayload["description"];
};

export type ClusterAclActions = {
  "CLUSTER.ACL.ROLE.CREATE.UPDATE": {
    type: "CLUSTER.ACL.ROLE.CREATE.UPDATE";
    key: { clusterName: string };
    payload: Partial<AclRoleCreate>;
  };

  "CLUSTER.ACL.ROLE.CREATE.CLOSE": {
    type: "CLUSTER.ACL.ROLE.CREATE.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.ACL.ROLE.PERMISSION.UPDATE": {
    type: "CLUSTER.ACL.ROLE.PERMISSION.UPDATE";
    key: { clusterName: string };
    payload: {
      permissionInfoList: AclCreateRolePayload["permission_info_list"];
    };
  };

  "CLUSTER.ACL.ROLE.PERMISSION.CLOSE": {
    type: "CLUSTER.ACL.ROLE.PERMISSION.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.ACL.USER.CREATE.UPDATE": {
    type: "CLUSTER.ACL.USER.CREATE.UPDATE";
    key: { clusterName: string };
    payload: Partial<{ userId: string; roleList: string[] }>;
  };

  "CLUSTER.ACL.USER.CREATE.CLOSE": {
    type: "CLUSTER.ACL.USER.CREATE.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.ACL.USER.ASSIGN.UPDATE": {
    type: "CLUSTER.ACL.USER.ASSIGN.UPDATE";
    key: { clusterName: string };
    payload: Partial<{ roleId: string; userId: string }>;
  };

  "CLUSTER.ACL.USER.ASSIGN.CLOSE": {
    type: "CLUSTER.ACL.USER.ASSIGN.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.ACL.GROUP.CREATE.UPDATE": {
    type: "CLUSTER.ACL.GROUP.CREATE.UPDATE";
    key: { clusterName: string };
    payload: Partial<{ groupId: string; roleList: string[] }>;
  };

  "CLUSTER.ACL.GROUP.CREATE.CLOSE": {
    type: "CLUSTER.ACL.GROUP.CREATE.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.ACL.GROUP.ASSIGN.UPDATE": {
    type: "CLUSTER.ACL.GROUP.ASSIGN.UPDATE";
    key: { clusterName: string };
    payload: Partial<{ roleId: string; groupId: string }>;
  };

  "CLUSTER.ACL.GROUP.ASSIGN.CLOSE": {
    type: "CLUSTER.ACL.GROUP.ASSIGN.CLOSE";
    key: { clusterName: string };
  };
};
