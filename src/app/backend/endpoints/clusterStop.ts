import {endpoint} from "./endpoint";

export const clusterStop = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/cluster_stop`,
  method: "post",
  params: ({
    nodeName,
    force,
  }: {
    nodeName?: string;
    force?: boolean;
  }): [string, string][] => {
    const params = [nodeName !== undefined ? ["name", nodeName] : ["all", "1"]];

    if (force) {
      params.push(["force", "1"]);
    }

    return params as [string, string][];
  },
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
