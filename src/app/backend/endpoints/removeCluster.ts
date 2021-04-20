import { endpoint } from "./endpoint";

export const removeCluster = endpoint({
  url: "/manage/removecluster",
  method: "post",
  shape: undefined,
});
