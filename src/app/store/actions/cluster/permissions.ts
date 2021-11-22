import { api, getPermissions } from "app/backend";

export type ClusterPermissionsActions = {
  "CLUSTER.PERMISSIONS.SAVE": {
    type: "CLUSTER.PERMISSIONS.SAVE";
    key: {
      clusterName: string;
      task: "permissionCreate" | "permissionUpdate" | "permissionRemove";
    };
    payload: {
      permissions: {
        name: string;
        type: string;
        allow: string[];
      }[];
    };
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

  "CLUSTER.PERMISSIONS.EDIT": {
    type: "CLUSTER.PERMISSIONS.EDIT";
    key: { permissionName: string };
  };

  "CLUSTER.PERMISSION.CREATE.UPDATE": {
    type: "CLUSTER.PERMISSION.CREATE.UPDATE";
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
    payload: {
      apiClusterPermissions: api.PayloadOf<typeof getPermissions>;
    };
  };

  "CLUSTER.PERMISSIONS.LOAD.ERROR": {
    type: "CLUSTER.PERMISSIONS.LOAD.ERROR";
    key: { clusterName: string };
  };
};
