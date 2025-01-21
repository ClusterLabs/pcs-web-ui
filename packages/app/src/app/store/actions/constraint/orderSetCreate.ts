import type {Action} from "./types";

type OptionalAction = Action | "no limitation";

export type OrderSetCreateActions = {
  "CONSTRAINT.ORDER.SET.CREATE.INIT": {
    type: "CONSTRAINT.ORDER.SET.CREATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      offeredResourceIdList: string[];
    };
  };
  "CONSTRAINT.ORDER.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE";
    key: {clusterName: string};
    payload: {
      useCustomId?: boolean;
      id?: string;
    };
  };

  "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET": {
    type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET";
    key: {clusterName: string};
    payload: {
      index: number;
      set: {
        resources?: string[];
        action?: OptionalAction;
        sequential?: boolean;
        requireAll?: boolean;
      };
    };
  };

  "CONSTRAINT.ORDER.SET.CREATE.CLOSE": {
    type: "CONSTRAINT.ORDER.SET.CREATE.CLOSE";
    key: {clusterName: string};
  };
};
