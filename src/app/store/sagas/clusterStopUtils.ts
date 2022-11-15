import {clusterStop} from "app/backend";

import {api} from "./common";

export const stripForceText = (
  result: Exclude<api.ResultOf<typeof clusterStop>, {type: "OK"}>,
) => {
  if (!("text" in result)) {
    return result;
  }

  const textToStrip = ", use --force to override";
  console.log(result.text);
  console.log(result.text.replace(textToStrip, ""));
  console.log({...result, text: result.text.replace(textToStrip, "")});

  return {...result, text: result.text.replace(textToStrip, "")};
};
