import type {Action} from "./types";

export type OrderCreateActions = {
  "CONSTRAINT.ORDER.CREATE.INIT": {
    type: "CONSTRAINT.ORDER.CREATE.INIT";
    payload: {
      resourceIdList: string[];
    };
  };
  "CONSTRAINT.ORDER.CREATE.UPDATE": {
    type: "CONSTRAINT.ORDER.CREATE.UPDATE";
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
  };

  "CONSTRAINT.ORDER.CREATE.CLOSE": {
    type: "CONSTRAINT.ORDER.CREATE.CLOSE";
  };
};
