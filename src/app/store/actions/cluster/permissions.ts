import { api, getPermissions, savePermissions } from "app/backend";

type ApiPermissions = api.PayloadOf<typeof getPermissions>;

export type ClusterPermissionsActions = {
  "CLUSTER.PERMISSIONS.SAVE": {
    type: "CLUSTER.PERMISSIONS.SAVE";
    key: {
      clusterName: string;
      task: "permissionEdit" | "permissionRemove";
    };
    payload: { permissionList: Parameters<typeof savePermissions>[1] };
  };
  "CLUSTER.PERMISSIONS.SAVE.OK": {
    type: "CLUSTER.PERMISSIONS.SAVE.OK";
  };

  "CLUSTER.PERMISSIONS.SAVE.ERROR": {
    type: "CLUSTER.PERMISSIONS.SAVE.ERROR";
    payload: {
      message: string;
    };
  };
  "CLUSTER.PERMISSIONS.SAVE.ERROR.RECOVER": {
    type: "CLUSTER.PERMISSIONS.SAVE.ERROR.RECOVER";
    key: { clusterName: string; task: string };
  };

  "CLUSTER.PERMISSIONS.EDIT": {
    type: "CLUSTER.PERMISSIONS.EDIT";
    key: { clusterName: string; task: string };
    payload:
      | { type: "create" }
      | {
          type: "update";
          permission: ApiPermissions["users_permissions"][number];
        };
  };

  "CLUSTER.PERMISSION.EDIT.UPDATE": {
    type: "CLUSTER.PERMISSION.EDIT.UPDATE";
    payload: {
      name?: string;
      type?: "user" | "group";
      read?: boolean;
      write?: boolean;
      grant?: boolean;
      full?: boolean;
    };
    key: { clusterName: string; task: string };
  };

  "CLUSTER.PERMISSIONS.LOAD": {
    type: "CLUSTER.PERMISSIONS.LOAD";
    key: { clusterName: string };
  };

  "CLUSTER.PERMISSIONS.LOAD.OK": {
    type: "CLUSTER.PERMISSIONS.LOAD.OK";
    key: { clusterName: string };
    payload: { apiClusterPermissions: ApiPermissions };
  };

  "CLUSTER.PERMISSIONS.LOAD.ERROR": {
    type: "CLUSTER.PERMISSIONS.LOAD.ERROR";
    key: { clusterName: string };
  };
};
