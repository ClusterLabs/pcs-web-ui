import { LibReport } from "app/store/types";

import { Action } from "./types";

export type OrderSetCreateActions = {
  "CONSTRAINT.ORDER.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      id?: string;
    };
  };

  "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET": {
    type: "CONSTRAINT.ORDER.SET.CREATE.CREATE.SET";
    key: { clusterName: string };
  };

  "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET": {
    type: "CONSTRAINT.ORDER.SET.CREATE.DELETE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
    };
  };

  "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET": {
    type: "CONSTRAINT.ORDER.SET.CREATE.UPDATE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
      set: {
        resources?: string[];
        action?: Action;
        sequential?: boolean;
        requireAll?: boolean;
      };
    };
  };

  "CONSTRAINT.ORDER.SET.CREATE": {
    type: "CONSTRAINT.ORDER.SET.CREATE";
    key: { clusterName: string };
    payload: {
      id: string;
      sets: {
        resources: string[];
        action: Action;
        sequential: boolean;
        requireAll: boolean;
      }[];
      force: boolean;
    };
  };

  "CONSTRAINT.ORDER.SET.CREATE.OK": {
    type: "CONSTRAINT.ORDER.SET.CREATE.OK";
    key: { clusterName: string };
    payload: {
      reports: LibReport[];
      success: boolean;
    };
  };

  "CONSTRAINT.ORDER.SET.CREATE.ERROR": {
    type: "CONSTRAINT.ORDER.SET.CREATE.ERROR";
    key: { clusterName: string };
  };
};
