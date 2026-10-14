import type {Role} from "./types";

type OptionalRole = "no limitation" | Role;

export type ColocationSetCreateActions = {
  "CONSTRAINT.COLOCATION.SET.CREATE.INIT": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.INIT";
    payload: {
      clusterName: string;
      offeredResourceIdList: string[];
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE";
    payload: {
      useCustomId?: boolean;
      id?: string;
      placement?: "together" | "apart";
      score?: string;
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET";
    payload: {
      index: number;
      set: {
        resources?: string[];
        sequential?: boolean;
        role?: OptionalRole;
      };
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE";
  };
};
