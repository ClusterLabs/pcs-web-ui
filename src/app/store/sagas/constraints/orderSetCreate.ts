import { libCallCluster } from "app/backend";
import { Action, ActionMap } from "app/store/actions";

import { api, lib, processError, put } from "../common";

type TrueFalse = "true" | "false";

export function* orderSetCreate({
  key,
  payload: { id, force, sets },
}: ActionMap["CONSTRAINT.ORDER.SET.CREATE"]) {
  const result: api.ResultOf<typeof libCallCluster> = yield api.authSafe(
    libCallCluster,
    {
      clusterName: key.clusterName,
      command: {
        name: "constraint-order-create-with-set",
        payload: {
          constraint_options: {
            id,
          },
          resource_set_list: sets.map(set => ({
            ids: set.resources,
            options: {
              ...(set.action !== "no limitation" ? { action: set.action } : {}),
              sequential: (set.sequential ? "true" : "false") as TrueFalse,
              "require-all": (set.requireAll ? "true" : "false") as TrueFalse,
            },
          })),
          resource_in_clone_alowed: force,
          duplication_alowed: force,
        },
      },
    },
  );

  const taskLabel = "create constraint order set";
  const errorAction: Action = {
    type: "CONSTRAINT.ORDER.SET.CREATE.ERROR",
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
      type: "CONSTRAINT.ORDER.SET.CREATE.OK",
      key,
      payload: {
        reports: result.payload.report_list,
        success: true,
      },
    },
    errorAction: {
      type: "CONSTRAINT.ORDER.SET.CREATE.OK",
      key,
      payload: {
        reports: result.payload.report_list,
        success: false,
      },
    },
    communicationErrorAction: errorAction,
  });
}
