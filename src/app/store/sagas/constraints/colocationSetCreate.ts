import { libCallCluster } from "app/backend";
import { Action, ActionMap } from "app/store/actions";

import { api, lib, processError, put } from "../common";

type TrueFalse = "true" | "false";

export function* colocationSetCreate({
  key,
  payload: { id, useCustomId, score, force, sets },
}: ActionMap["CONSTRAINT.COLOCATION.SET.CREATE"]) {
  const result: api.ResultOf<typeof libCallCluster> = yield api.authSafe(
    libCallCluster,
    {
      clusterName: key.clusterName,
      command: {
        name: "constraint-colocation-create-with-set",
        payload: {
          constraint_options: {
            id: useCustomId ? id : undefined,
            score,
          },
          resource_set_list: sets.map(set => ({
            ids: set.resources,
            options: {
              ...(set.role !== "no limitation" ? { role: set.role } : {}),
              sequential: (set.sequential ? "true" : "false") as TrueFalse,
            },
          })),
          resource_in_clone_alowed: force,
          duplication_alowed: force,
        },
      },
    },
  );

  const taskLabel = "create constraint colocation set";
  const errorAction: Action = {
    type: "CONSTRAINT.COLOCATION.SET.CREATE.ERROR",
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
      type: "CONSTRAINT.COLOCATION.SET.CREATE.OK",
      key,
      payload: {
        reports: result.payload.report_list,
        success: true,
      },
    },
    errorAction: {
      type: "CONSTRAINT.COLOCATION.SET.CREATE.OK",
      key,
      payload: {
        reports: result.payload.report_list,
        success: false,
      },
    },
    communicationErrorAction: errorAction,
  });
}
