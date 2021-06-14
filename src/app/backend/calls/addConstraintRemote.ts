import { CallResult, endpoints, http } from "./tools";

const { url, params } = endpoints.addConstraintRemote;

export const addConstraintRemote = async ({
  clusterName,
  constraint,
}: {
  clusterName: string;
  constraint: Parameters<typeof params>[0]["constraint"];
}): CallResult =>
  http.post(url({ clusterName }), {
    params: params({ constraint }),
  });
