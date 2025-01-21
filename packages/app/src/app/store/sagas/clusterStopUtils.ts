import type {clusterStop} from "app/backend";

import type {api} from "./common";

export const stripForceText = (
  result: Exclude<api.ResultOf<typeof clusterStop>, {type: "OK"}>,
) => {
  if (!("text" in result)) {
    return result;
  }

  const textToStrip = ", use --force to override";

  return {...result, text: result.text.replace(textToStrip, "")};
};
