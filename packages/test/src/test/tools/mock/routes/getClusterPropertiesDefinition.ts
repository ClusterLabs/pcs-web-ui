import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

export const getClusterPropertiesDefinition = (_props: {
  clusterName: string;
}) => ({
  url: endpoints.getClusterPropertiesDefinition.url,
  json: responses.clusterProperties.ok,
});
