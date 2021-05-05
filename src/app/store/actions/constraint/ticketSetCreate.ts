import { LibReport } from "app/store/types";

type OptionalRole =
  | "no limitation"
  | "Stopped"
  | "Started"
  | "Master"
  | "Slave";
type LossPolicy = "fence" | "stop" | "freeze" | "demote";

export type TicketSetCreateActions = {
  "CONSTRAINT.TICKET.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE";
    key: { clusterName: string };
    payload: {
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

  "CONSTRAINT.TICKET.SET.CREATE.CREATE.SET": {
    type: "CONSTRAINT.TICKET.SET.CREATE.CREATE.SET";
    key: { clusterName: string };
  };

  "CONSTRAINT.TICKET.SET.CREATE.DELETE.SET": {
    type: "CONSTRAINT.TICKET.SET.CREATE.DELETE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
    };
  };

  "CONSTRAINT.TICKET.SET.CREATE": {
    type: "CONSTRAINT.TICKET.SET.CREATE";
    key: { clusterName: string };
    payload: {
      id: string;
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

  "CONSTRAINT.TICKET.SET.CREATE.MOVE.SET": {
    type: "CONSTRAINT.TICKET.SET.CREATE.MOVE.SET";
    key: { clusterName: string };
    payload: {
      index: number;
      direction: "up" | "down";
    };
  };

  "CONSTRAINT.TICKET.SET.CREATE.ERROR": {
    type: "CONSTRAINT.TICKET.SET.CREATE.ERROR";
    key: { clusterName: string };
  };
};
