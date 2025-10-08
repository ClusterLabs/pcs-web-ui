import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.updateClusterSettings;

export const updateClusterSettings = async ({
  clusterName,
  settingsMap,
  force,
}: {
  clusterName: string;
  settingsMap: Parameters<typeof params>[0]["settingsMap"];
  force: boolean;
}): CallResult =>
  http.post(url({clusterName}), {
    params: params({settingsMap, force}),
  });
