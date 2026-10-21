import {endpoints} from "app/backend/endpoints";

import * as responses from "dev/responses";

export const getClusterPropertiesDefinition = () => ({
  url: endpoints.getClusterPropertiesDefinition.url,
  json: responses.clusterProperties.ok,
});
