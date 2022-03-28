import { endpoints } from "app/backend/endpoints";

import { RouteResponse } from "test/tools/interception";

export const clusterStart = ({
  clusterName,
  nodeName,
  response,
}: {
  clusterName: string;
  nodeName: string;
  response?: RouteResponse;
}) => ({
  url: endpoints.clusterStart.url({ clusterName }),
  body: { name: nodeName },
  ...(response ?? { text: "" }),
});
