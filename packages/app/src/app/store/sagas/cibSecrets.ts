import {libCallCluster} from "app/backend";
import type {CommandResponseData} from "app/backend/endpoints/lib/cluster/libCluster";
import type {Action, ActionMap} from "app/store/actions";

import {api, lib, log, processError, put, putNotification} from "./common";

type ApiCallResult = api.ResultOf<typeof libCallCluster>;

export function* load({
  key,
  payload: {resourceId, attributeNames},
}: ActionMap["RESOURCE.CIB_SECRETS.LOAD"]) {
  const result: ApiCallResult = yield api.authSafe(libCallCluster, {
    clusterName: key.clusterName,
    command: {
      name: "resource-get-cibsecrets" as const,
      payload: {
        queries: attributeNames.map((n: string): [string, string] => [
          resourceId,
          n,
        ]),
      },
    },
  });

  const taskLabel = "reveal CIB secrets";

  const errorAction: Action = {
    type: "RESOURCE.CIB_SECRETS.LOAD.FAILED",
    key,
    payload: {resourceId},
  };

  if (result.type !== "OK") {
    yield processError(result, taskLabel, {
      action: () => put(errorAction),
    });
    return;
  }

  const {payload} = result;

  if (lib.isCommunicationError(payload)) {
    log.libInputError(payload.status, payload.status_msg, taskLabel);
    yield put(errorAction);
    yield putNotification("ERROR", `Task: ${taskLabel} failed.`);
    return;
  }

  if (payload.status === "error") {
    yield put(errorAction);
    yield putNotification("ERROR", `Task: ${taskLabel} failed.`, {
      type: "LIST",
      title: "Messages from the backend",
      items: payload.report_list.map(
        r => `${r.severity.level}: ${r.message.message}`,
      ),
    });
    return;
  }

  const data = payload.data as CommandResponseData["resource-get-cibsecrets"];

  yield put({
    type: "RESOURCE.CIB_SECRETS.LOAD.SUCCESS",
    key,
    payload: {resource_secrets: data.resource_secrets},
  });
}
