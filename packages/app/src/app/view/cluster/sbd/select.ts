import type {Cluster} from "app/view/cluster/types";

type SbdConfig = Exclude<
  Exclude<Cluster["nodeList"][number], {status: "DATA_NOT_PROVIDED"}>["sbd"],
  undefined
>["config"];

export const selectSbdConfig = (nodeList: Cluster["nodeList"]) =>
  nodeList.reduce<SbdConfig>((config, node) => {
    if (Object.keys(config).length > 0 || node.status === "DATA_NOT_PROVIDED") {
      return config;
    }
    return node.sbd?.config ?? {};
  }, {});
