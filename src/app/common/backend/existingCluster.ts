import * as api from "app/common/api";

import { dealWithNoAuth } from "./dealWithNoAuth";
import { createResult } from "./result";

export const call = dealWithNoAuth(async (
  nodeName: string,
) => {
  const raw = await api.call.postForText(
    "/manage/existingcluster",
    [["node-name", nodeName]],
  );
  return createResult<string>(raw, []);
});
