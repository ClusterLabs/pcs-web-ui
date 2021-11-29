import { endpoint } from "./endpoint";

export const updateClusterSettings = endpoint({
  url: ({ clusterName }: { clusterName: string }) =>
    `/managec/${clusterName}/update_cluster_settings`,
  method: "post",
  params: ({
    settingsMap,
  }: {
    settingsMap: Record<string, string>;
  }): [string, string][] => [
    ["hidden[hidden_input]", ""],
    ...(Object.keys(settingsMap).map(name => [
      `config[${name}]`,
      settingsMap[name],
    ]) as [string, string][]),
  ],
  payload: undefined,
  validate: undefined,
  shape: undefined,
});
