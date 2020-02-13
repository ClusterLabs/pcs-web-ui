import { postForText } from "./calls";

import { createResult, ApiCall } from "./tools";

export const existingCluster: ApiCall<string> = async (nodeName: string) => {
  const raw = await postForText(
    "/manage/existingcluster",
    [["node-name", nodeName]],
  );
  return createResult<string>(raw, []);
};
