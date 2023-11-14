export type ResourceBanActions = {
  "RESOURCE.BAN.OPEN": {
    type: "RESOURCE.BAN.OPEN";
    payload: {
      clusterName: string;
      resourceId: string;

      nodeNameList: string[];
    } & (
      | {resourceType: "primitive resource" | "group"}
      | {resourceType: "clone"; isPromotable: boolean}
    );
  };

  "RESOURCE.BAN.CLOSE": {
    type: "RESOURCE.BAN.CLOSE";
  };

  "RESOURCE.BAN.UPDATE": {
    type: "RESOURCE.BAN.UPDATE";
    payload: {
      useNode?: boolean;
      node?: string;
      constraintHandling?: "keep" | "expire";
      constraintLifetime?: string;
      limitToPromoted?: boolean;
    };
  };
};
