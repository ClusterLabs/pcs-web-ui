import { LibReport } from "app/store/types";

import { Role } from "./types";

type OptionalRole = "no limitation" | Role;

export type ColocationSetCreateActions = {
  "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      useCustomId?: boolean;
      id?: string;
      score?: string;
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.CREATE.SET": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.CREATE.SET";
    key: { clusterName: string };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.DELETE.SET": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.DELETE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.UPDATE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
      set: {
        resources?: string[];
        sequential?: boolean;
        role?: OptionalRole;
      };
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.MOVE.SET": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.MOVE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
      direction: "up" | "down";
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE";
    key: { clusterName: string };
    payload: {
      id: string;
      score: string;
      useCustomId: boolean;
      sets: {
        resources: string[];
        role: OptionalRole;
        sequential: boolean;
      }[];
      force: boolean;
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.OK": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.OK";
    key: { clusterName: string };
    payload: {
      reports: LibReport[];
      success: boolean;
    };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.ERROR": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.ERROR";
    key: { clusterName: string };
  };

  "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE": {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
