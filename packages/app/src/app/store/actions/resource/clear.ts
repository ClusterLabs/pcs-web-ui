export type ResourceClearActions = {
  "RESOURCE.CLEAR.OPEN": {
    type: "RESOURCE.CLEAR.OPEN";
    payload: {
      clusterName: string;
      resourceId: string;

      nodeNameList: string[];
    } & (
      | {resourceType: "primitive resource" | "group"}
      | {resourceType: "clone"; isPromotable: boolean}
    );
  };

  "RESOURCE.CLEAR.CLOSE": {
    type: "RESOURCE.CLEAR.CLOSE";
  };

  "RESOURCE.CLEAR.UPDATE": {
    type: "RESOURCE.CLEAR.UPDATE";
    payload: {
      useNode?: boolean;
      node?: string;
      expiredOnly?: boolean;
      limitToPromoted?: boolean;
    };
  };
};
