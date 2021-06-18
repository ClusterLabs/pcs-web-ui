import { CallResult, endpoints, http } from "./tools";

const { url, params } = endpoints.updateClusterSettings;

export const updateClusterSettings = async ({
  clusterName,
  settingsMap,
}: {
  clusterName: string;
  settingsMap: Parameters<typeof params>[0]["settingsMap"];
}): CallResult =>
  http.post(url({ clusterName }), {
    params: params({ settingsMap }),
  });
