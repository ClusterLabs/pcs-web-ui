import { CallResult, endpoints, http } from "./tools";

const { url, params } = endpoints.setResourceUtilization;

export const setResourceUtilization = ({
  clusterName,
  resourceId,
  name,
  value,
}: { clusterName: string } & Parameters<typeof params>[0]): CallResult =>
  http.post(url({ clusterName }), {
    params: params({ resourceId, name, value }),
  });
