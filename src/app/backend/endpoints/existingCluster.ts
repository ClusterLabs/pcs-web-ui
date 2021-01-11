import { endpoint } from "./endpoint";

export const existingCluster = endpoint({
  url: "/manage/existingcluster",
  method: "post",
  shape: undefined,
});
