import type {Role} from "./types";

type OptionalRole = "no limitation" | Role;
type LossPolicy = "fence" | "stop" | "freeze" | "demote";

export type TicketSetCreateActions = {
  "CONSTRAINT.TICKET.SET.CREATE.INIT": {
    type: "CONSTRAINT.TICKET.SET.CREATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      offeredResourceIdList: string[];
    };
  };
  "CONSTRAINT.TICKET.SET.CREATE.UPDATE": {
    type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE";
    key: {clusterName: string};
    payload: {
      ticket?: string;
      useCustomId?: boolean;
      id?: string;
      lossPolicy?: LossPolicy;
    };
  };
  "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET": {
    type: "CONSTRAINT.TICKET.SET.CREATE.UPDATE.SET";
    key: {clusterName: string};
    payload: {
      index: number;
      set: {
        resources?: string[];
        role?: OptionalRole;
      };
    };
  };

  "CONSTRAINT.TICKET.SET.CREATE.CLOSE": {
    type: "CONSTRAINT.TICKET.SET.CREATE.CLOSE";
    key: {clusterName: string};
  };
};
