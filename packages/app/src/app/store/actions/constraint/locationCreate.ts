type ResourceSpecification = "resource" | "pattern";
type LocationSpecification = "node" | "rule";
type LocationPreference = "prefer" | "avoid";

export type LocationCreateActions = {
  "CONSTRAINT.LOCATION.CREATE.INIT": {
    type: "CONSTRAINT.LOCATION.CREATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      nodeNameList: string[];
      resourceIdList: string[];
    };
  };

  "CONSTRAINT.LOCATION.CREATE.UPDATE": {
    type: "CONSTRAINT.LOCATION.CREATE.UPDATE";
    key: {clusterName: string};
    payload: {
      score?: string;
      resourceSpecification?: ResourceSpecification;
      resourceId?: string;
      resourcePattern?: string;
      locationSpecification?: LocationSpecification;
      nodeName?: string;
      preference?: LocationPreference;
      rule?: string;
    };
  };

  "CONSTRAINT.LOCATION.CREATE.CLOSE": {
    type: "CONSTRAINT.LOCATION.CREATE.CLOSE";
    key: {clusterName: string};
  };
};
