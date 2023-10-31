import {Role} from "./types";

type OptionalRole = "no limitation" | Role;
type LossPolicy = "fence" | "stop" | "freeze" | "demote";

export type TicketCreateActions = {
  "CONSTRAINT.TICKET.CREATE.INIT": {
    type: "CONSTRAINT.TICKET.CREATE.INIT";
    key: {clusterName: string};
    payload: {
      clusterName: string;
      resourceIdList: string[];
    };
  };
  "CONSTRAINT.TICKET.CREATE.UPDATE": {
    type: "CONSTRAINT.TICKET.CREATE.UPDATE";
    key: {clusterName: string};
    payload: {
      useCustomId?: boolean;
      id?: string;
      lossPolicy?: LossPolicy;
      role?: OptionalRole;
      resourceId?: string;
      ticket?: string;
    };
  };

  "CONSTRAINT.TICKET.CREATE.CLOSE": {
    type: "CONSTRAINT.TICKET.CREATE.CLOSE";
    key: {clusterName: string};
  };
};
