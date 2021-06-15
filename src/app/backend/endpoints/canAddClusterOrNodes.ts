import { endpoint } from "./endpoint";

export const canAddClusterOrNodes = endpoint({
  url: "/manage/can-add-cluster-or-nodes",
  method: "get",
  params: undefined,
  shape: undefined,
});
