export type ResourceMoveActions = {
  "RESOURCE.MOVE.OPEN": {
    type: "RESOURCE.MOVE.OPEN";
    payload: {
      clusterName: string;
      resourceId: string;
      nodeNameList: string[];
    };
  };
  "RESOURCE.MOVE.UPDATE": {
    type: "RESOURCE.MOVE.UPDATE";
    payload: {
      useNode?: boolean;
      node?: string;
    };
  };
};
