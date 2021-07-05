import { endpoint } from "./endpoint";

export const rememberCluster = endpoint({
  url: "/manage/remember-cluster",
  method: "post",
  params: ({
    clusterName,
    nodeNameList,
  }: {
    clusterName: string;
    nodeNameList: string[];
  }): [string, string][] => [
    ["cluster_name", clusterName],
    ...nodeNameList.map(node => ["nodes[]", node] as [string, string]),
  ],
  shape: undefined,
});
