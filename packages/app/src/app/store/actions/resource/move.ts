export type ResourceMoveActions = {
  "RESOURCE.MOVE.OPEN": {
    type: "RESOURCE.MOVE.OPEN";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      resourceId: string;
    };
  };
};
