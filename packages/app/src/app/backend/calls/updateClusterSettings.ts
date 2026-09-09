import {type CallResult, endpoints, http} from "./tools";

const {url, params} = endpoints.updateClusterSettings;

export const updateClusterSettings = async ({
  settingsMap,
  force,
}: {
  settingsMap: Parameters<typeof params>[0]["settingsMap"];
  force: boolean;
}): CallResult => http.post(url, {params: params({settingsMap, force})});
