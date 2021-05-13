export type ResourceSetActions = {
  "RESOURCE.SET.LIST.MOVE.SET": {
    type: "RESOURCE.SET.LIST.MOVE.SET";
    key: { clusterName: string; task: string };
    payload: {
      index: number;
      direction: "up" | "down";
    };
  };

  "RESOURCE.SET.LIST.CREATE.SET": {
    type: "RESOURCE.SET.LIST.CREATE.SET";
    key: { clusterName: string; task: string };
  };

  "RESOURCE.SET.LIST.DELETE.SET": {
    type: "RESOURCE.SET.LIST.DELETE.SET";
    key: { clusterName: string; task: string };
    payload: {
      index: number;
    };
  };
};
