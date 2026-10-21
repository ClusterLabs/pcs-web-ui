import type {RouteResponse} from "../mock";

import {type LibClusterCommandPayload, libCluster} from "./libCluster";

type ConstraintTicektCreatePayload =
  LibClusterCommandPayload["constraint-ticket-create"];

export const constraintTicketCreate = ({
  resourceId,
  response,
  ticketKey,
  id,
  rscRole,
  lossPolicy,
  force,
}: {
  ticketKey: string;
  resourceId: string;
  id?: string;
  rscRole?: ConstraintTicektCreatePayload["options"]["rsc-role"];
  lossPolicy?: ConstraintTicektCreatePayload["options"]["loss-policy"];
  response?: RouteResponse;
  force?: boolean;
}) =>
  libCluster({
    name: "constraint-ticket-create",
    payload: {
      ticket_key: ticketKey,
      resource_id: resourceId,
      options: {
        ...(id ? {id} : {}),
        ...(rscRole ? {"rsc-role": rscRole} : {}),
        ...(lossPolicy ? {"loss-policy": lossPolicy} : {}),
      },
      resource_in_clone_alowed: force === undefined ? false : force,
      duplication_alowed: force === undefined ? false : force,
    },
    response,
  });
