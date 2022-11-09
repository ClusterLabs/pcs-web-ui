import {Role} from "./types";

type OptionalRole = "no limitation" | Role;

export type ColocationSetCreateActions = {
  "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE";
    key: {clusterName: string};
    payload: {
      useCustomId?: boolean;
      id?: string;
      placement?: "together" | "apart";
      score?: string;
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET";
    key: {clusterName: string};
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
    key: {clusterName: string};
  };
};
