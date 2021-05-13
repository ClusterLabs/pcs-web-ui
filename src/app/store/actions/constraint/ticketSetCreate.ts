import { LibReport } from "app/store/types";

import { Role } from "./types";

type OptionalRole = "no limitation" | Role;
type LossPolicy = "fence" | "stop" | "freeze" | "demote";

export type TicketSetCreateActions = {
  "CONSTRAINT.TICKET.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
      useCustomId?: boolean;
      id?: string;
      lossPolicy?: LossPolicy;
    };
  };
  "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET": {
    type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
      set: {
        resources?: string[];
        role?: OptionalRole;
      };
    };
  };

  "CONSTRAINT.TICKET.SET.CREATE": {
    type: "CONSTRAINT.TICKET.SET.CREATE";
    key: { clusterName: string };
    payload: {
      id: string;
      useCustomId: boolean;
      lossPolicy: LossPolicy;
      sets: {
        resources: string[];
        role: OptionalRole;
      }[];
      force: boolean;
    };
  };

  "CONSTRAINT.TICKET.SET.CREATE.OK": {
    type: "CONSTRAINT.TICKET.SET.CREATE.OK";
    key: { clusterName: string };
    payload: {
      reports: LibReport[];
      success: boolean;
    };
  };

  "CONSTRAINT.TICKET.SET.CREATE.ERROR": {
    type: "CONSTRAINT.TICKET.SET.CREATE.ERROR";
    key: { clusterName: string };
  };

  "CONSTRAINT.TICKET.SET.CREATE.CLOSE": {
    type: "CONSTRAINT.TICKET.SET.CREATE.CLOSE";
    key: { clusterName: string };
  };
};
