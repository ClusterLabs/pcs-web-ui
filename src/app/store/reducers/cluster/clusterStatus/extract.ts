import { Cluster } from "./types";

type ClusterSbdConfig = Exclude<
  Exclude<Cluster["nodeList"][number], { status: "DATA_NOT_PROVIDED" }>["sbd"],
  undefined
>["config"];

export const getClusterSbdConfig = (cluster: Cluster) =>
  cluster.nodeList.reduce<ClusterSbdConfig>((config, node) => {
    if (Object.keys(config).length > 0 || node.status === "DATA_NOT_PROVIDED") {
      return config;
    }
    return node.sbd?.config ?? {};
  }, {});
