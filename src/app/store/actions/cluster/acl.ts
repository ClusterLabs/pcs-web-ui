import { api } from "app/backend";

type AclCreateRolePayload = api.Lib.ClusterCallPayload<"acl-create-role">;

export type ClusterAclActions = {
  "CLUSTER.ACL.ROLE.CREATE.UPDATE": {
    type: "CLUSTER.ACL.ROLE.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      roleId?: AclCreateRolePayload["role_id"];
      permissionInfoList?: AclCreateRolePayload["permission_info_list"];
      description?: AclCreateRolePayload["description"];
    };
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

  "CLUSTER.ACL.SUBJECT.CREATE": {
    type: "CLUSTER.ACL.SUBJECT.CREATE";
    key: { clusterName: string };
    payload: {
      subjectType: "user" | "group";
    };
  };

  "CLUSTER.ACL.SUBJECT.CREATE.UPDATE": {
    type: "CLUSTER.ACL.SUBJECT.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      subjectId?: string;
      roleList?: string[];
    };
  };

  "CLUSTER.ACL.SUBJECT.CREATE.CLOSE": {
    type: "CLUSTER.ACL.SUBJECT.CREATE.CLOSE";
    key: { clusterName: string };
  };

  "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN": {
    type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN";
    key: { clusterName: string };
    payload: {
      subjectType: "user" | "group";
    } & ({ roleId: string } | { subjectId: string });
  };

  "CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE": {
    type: "CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE";
    key: { clusterName: string };
    payload: {
      roleId?: string;
      subjectId?: string;
    };
  };

  "CLUSTER.ACL.SUBJECT.ASSIGN.CLOSE": {
    type: "CLUSTER.ACL.SUBJECT.ASSIGN.CLOSE";
    key: { clusterName: string };
  };
};
