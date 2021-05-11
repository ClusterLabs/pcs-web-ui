import { libCallCluster } from "app/backend";
import { Action, ActionMap } from "app/store/actions";

import { api, lib, processError, put } from "../common";

export function* ticketSetCreate({
  key,
  payload: { id, useCustomId, lossPolicy, force, sets },
}: ActionMap["CONSTRAINT.TICKET.SET.CREATE"]) {
  const result: api.ResultOf<typeof libCallCluster> = yield api.authSafe(
    libCallCluster,
    {
      clusterName: key.clusterName,
      command: {
        name: "constraint-ticket-create-with-set",
        payload: {
          constraint_options: {
            id: useCustomId ? id : undefined,
            "loss-policy": lossPolicy,
          },
          resource_set_list: sets.map(set => ({
            ids: set.resources,
            options: {
              ...(set.role !== "no limitation" ? { role: set.role } : {}),
            },
          })),
          resource_in_clone_alowed: force,
          duplication_alowed: force,
        },
      },
    },
  );

  const taskLabel = "create constraint ticket set";
  const errorAction: Action = {
    type: "CONSTRAINT.TICKET.SET.CREATE.ERROR",
    key,
  };
  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
      useNotification: false,
    });
    return;
  }

  yield lib.clusterResponseSwitch(key.clusterName, taskLabel, result.payload, {
    successAction: {
      type: "CONSTRAINT.TICKET.SET.CREATE.OK",
      key,
      payload: {
        reports: result.payload.report_list,
        success: true,
      },
    },
    errorAction: {
      type: "CONSTRAINT.TICKET.SET.CREATE.OK",
      key,
      payload: {
        reports: result.payload.report_list,
        success: false,
      },
    },
    communicationErrorAction: errorAction,
  });
}
