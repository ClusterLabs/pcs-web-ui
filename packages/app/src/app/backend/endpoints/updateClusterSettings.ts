import {endpoint} from "./endpoint";

export const updateClusterSettings = endpoint({
  url: ({clusterName}: {clusterName: string}) =>
    `/managec/${clusterName}/update_cluster_settings`,
  method: "post",
  params: ({
    settingsMap,
    force,
  }: {
    settingsMap: Record<string, string>;
    force: boolean;
  }): [string, string][] => [
    ["hidden[hidden_input]", ""],
    ...(Object.keys(settingsMap).map(name => [
      `config[${name}]`,
      settingsMap[name],
    ]) as [string, string][]),
    ...(force
      ? ([["force", "true"]] as [string, string][])
      : ([] as [string, string][])),
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
