import { endpoints } from "app/backend/endpoints";

import * as responses from "dev/responses";

export const getClusterPropertiesDefinition = ({
  clusterName,
}: {
  clusterName: string;
}) => ({
  url: endpoints.getClusterPropertiesDefinition.url({ clusterName }),
  json: responses.clusterProperties.ok,
});
