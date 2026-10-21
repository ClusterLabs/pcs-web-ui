import type {api} from "app/backend";

type AclCreateRolePayload = api.Lib.ClusterCallPayload<"acl-create-role">;

export type ClusterAclActions = {
  "CLUSTER.ACL.ROLE.CREATE.UPDATE": {
    type: "CLUSTER.ACL.ROLE.CREATE.UPDATE";
    payload: {
      roleId?: AclCreateRolePayload["role_id"];
      permissionInfoList?: AclCreateRolePayload["permission_info_list"];
      description?: AclCreateRolePayload["description"];
    };
  };

  "CLUSTER.ACL.ROLE.CREATE.CLOSE": {
    type: "CLUSTER.ACL.ROLE.CREATE.CLOSE";
  };

  "CLUSTER.ACL.ROLE.PERMISSION": {
    type: "CLUSTER.ACL.ROLE.PERMISSION";
    payload: {
      roleId: string;
    };
  };

  "CLUSTER.ACL.ROLE.PERMISSION.UPDATE": {
    type: "CLUSTER.ACL.ROLE.PERMISSION.UPDATE";
    payload: {
      permissionInfoList: AclCreateRolePayload["permission_info_list"];
    };
  };

  "CLUSTER.ACL.ROLE.PERMISSION.CLOSE": {
    type: "CLUSTER.ACL.ROLE.PERMISSION.CLOSE";
  };

  "CLUSTER.ACL.SUBJECT.CREATE": {
    type: "CLUSTER.ACL.SUBJECT.CREATE";
    payload: {
      subjectType: "user" | "group";
      roleMap: Record<
        string,
        {
          description: string;
          permissions: string[];
        }
      >;
    };
  };

  "CLUSTER.ACL.SUBJECT.CREATE.UPDATE": {
    type: "CLUSTER.ACL.SUBJECT.CREATE.UPDATE";
    payload: {
      subjectId?: string;
      roleList?: string[];
    };
  };

  "CLUSTER.ACL.SUBJECT.CREATE.CLOSE": {
    type: "CLUSTER.ACL.SUBJECT.CREATE.CLOSE";
  };

  "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN": {
    type: "CLUSTER.ACL.SUBJECT_ROLE.ASSIGN";
    payload: {
      subjectType: "user" | "group";
      alreadyAssigned: string[];
      assignableItems: string[];
    } & ({roleId: string} | {subjectId: string});
  };

  "CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE": {
    type: "CLUSTER.ACL.SUBJECT.ASSIGN.UPDATE";
    payload: {
      roleId?: string;
      subjectId?: string;
    };
  };

  "CLUSTER.ACL.SUBJECT.ASSIGN.CLOSE": {
    type: "CLUSTER.ACL.SUBJECT.ASSIGN.CLOSE";
  };
};
