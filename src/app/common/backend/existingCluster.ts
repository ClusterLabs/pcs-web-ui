import * as auth from "app/services/auth/sagas";

export function* existingCluster(nodeName: string) {
  yield auth.postForText(
    "/manage/existingcluster",
    [["node-name", nodeName]],
  );
}
