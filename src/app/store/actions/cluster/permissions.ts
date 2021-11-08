import { api, getPermissions } from "app/backend";

export type ClusterPermissionsActions = {
  "CLUSTER.PERMISSIONS.SAVE": {
    type: "CLUSTER.PERMISSIONS.SAVE";
    key: { clusterName: string; permissionName: string };
    payload: {
      permissions: {
        name: string;
        type: string;
        allow: string[];
      }[];
    };
  };

  "CLUSTER.PERMISSIONS.EDIT": {
    type: "CLUSTER.PERMISSIONS.EDIT";
    key: { permissionName: string };
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
