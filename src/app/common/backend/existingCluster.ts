import * as api from "app/common/api";

import { createResult, dealWithNoAuth, ApiCall } from "./tools";

const apiCall: ApiCall<string> = async (nodeName: string) => {
  const raw = await api.call.postForText(
    "/manage/existingcluster",
    [["node-name", nodeName]],
  );
  return createResult<string>(raw, []);
};

export const call = dealWithNoAuth(apiCall);
