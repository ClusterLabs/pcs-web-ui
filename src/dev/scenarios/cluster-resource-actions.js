import * as endpoints from "dev/api/endpoints";
import * as responses from "dev/api/responses/all";

import * as lib from "./common/lib";

const importedClusterList = response =>
  endpoints.importedClusterList((_req, res) => {
    res.json(response);
  });

const clusterStatus = (responseMap = {}) =>
  endpoints.clusterStatus((req, res) => {
    const clusterName = req.params.clusterUrlName;
    if (Object.keys(responseMap).includes(clusterName)) {
      res.json(responseMap[clusterName]);
    } else {
      res.status(404).send("Not found");
    }
  });

const getResourceAgentMetadata = response =>
  endpoints.getResourceAgentMetadata((_req, res) => {
    res.json(response);
  });

const getAvailResourceAgents = response =>
  endpoints.getAvailResourceAgents((_req, res) => {
    res.json(response);
  });

const getFenceAgentMetadata = response =>
  endpoints.getFenceAgentMetadata((_req, res) => {
    res.json(response);
  });

const clusterProperties = response =>
  endpoints.clusterProperties((_req, res) => {
    res.json(response);
  });

const resourceUnmanage = endpoints.resourceUnmanage((req, res) => {
  lib.standardResponses({
    code: JSON.parse(req.body.unmanage_data).resource_or_tag_ids[0],
    res,
  });
});

export const all = [
  importedClusterList(
    responses.importedClusterList.withClusters([
      responses.clusterStatus.resourceTree.cluster_name,
    ]),
  ),
  clusterStatus({
    resourceTree: responses.clusterStatus.resourceTree,
  }),
  getAvailResourceAgents(responses.resourceAgentList.ok),
  getResourceAgentMetadata(responses.resourceAgentMetadata.ok),
  getFenceAgentMetadata(responses.fenceAgentMetadata.ok),
  clusterProperties(responses.clusterProperties.ok),
  resourceUnmanage,
];
