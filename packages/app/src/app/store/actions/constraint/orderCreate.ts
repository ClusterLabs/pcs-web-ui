import {Action} from "./types";

export type OrderCreateActions = {
  "CONSTRAINT.ORDER.CREATE.INIT": {
    type: "CONSTRAINT.ORDER.CREATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
    };
  };
  "CONSTRAINT.ORDER.CREATE.UPDATE": {
    type: "CONSTRAINT.ORDER.CREATE.UPDATE";
    key: {clusterName: string};
    payload: {
      firstResourceId?: string;
      firstAction?: Action;
      thenResourceId?: string;
      thenAction?: Action;
      score?: string;
    };
  };

  "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES": {
    type: "CONSTRAINT.ORDER.CREATE.SWAP_RESOURCES";
    key: {clusterName: string};
  };

  "CONSTRAINT.ORDER.CREATE.CLOSE": {
    type: "CONSTRAINT.ORDER.CREATE.CLOSE";
    key: {clusterName: string};
  };
};
