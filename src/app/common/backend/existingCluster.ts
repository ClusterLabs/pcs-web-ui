import * as api from "app/common/api";

import { createResult, ApiCall } from "./tools";

const existingCluster: ApiCall<string> = async (nodeName: string) => {
  const raw = await api.call.postForText(
    "/manage/existingcluster",
    [["node-name", nodeName]],
  );
  return createResult<string>(raw, []);
};

export default existingCluster;
