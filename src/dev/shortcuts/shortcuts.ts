import * as app from "dev/app";
import * as response from "dev/responses";
import * as types from "dev/types";

// basic
export const importedClusterList = (
  importedClusters: types.ImportedClusterList,
) =>
  app.importedClusterList((_req, res) => {
    res.json(importedClusters);
  });

const clusterStatus = (clusterStatusList: types.ClusterStatus[]) =>
  app.clusterStatus((req, res) => {
    const cluster = clusterStatusList.find(
      c => c.cluster_name === req.params.clusterUrlName,
    );
    if (cluster) {
      res.json(cluster);
    } else {
      res.status(404).send("Not found");
    }
  });

const getAvailResourceAgents = (
  availableResourceAgents: types.AvailResourceAgents,
) =>
  app.getAvailResourceAgents((_req, res) => {
    res.json(availableResourceAgents);
  });

const getResourceAgentMetadata = (metadatList: types.ResourceAgentMetadata[]) =>
  app.getResourceAgentMetadata((req, res) => {
    const metadata = metadatList.find(m => m.name === req.query.agent);
    if (metadata) {
      res.json(metadata);
    } else {
      res.status(404).send("Not found");
    }
  });

const getFenceAgentMetadata = (metadatList: types.FenceAgentMetadata[]) =>
  app.getFenceAgentMetadata((req, res) => {
    const metadata = metadatList.find(m => m.name === req.query.agent);
    if (metadata) {
      res.json(metadata);
    } else {
      res.status(404).send("Not found");
    }
  });

const clusterProperties = (properties: types.ClusterProperties) =>
  app.clusterProperties((_req, res) => {
    res.json(properties);
  });

// advanced

export const clusterRelated = () => {
  getAvailResourceAgents(response.resourceAgentList.ok);
  getResourceAgentMetadata([
    response.resourceAgentMetadata.ocfHeartbeatApache,
    response.resourceAgentMetadata.ocfHeartbeatDummy,
  ]);
  getFenceAgentMetadata([response.fenceAgentMetadata.ok]);
  clusterProperties(response.clusterProperties.ok);
};

export const dashboard = (clusterStatusList: types.ClusterStatus[]) => {
  importedClusterList(
    response.importedClusterList.withClusters(
      clusterStatusList.map(c => c.cluster_name),
    ),
  );
  clusterStatus(clusterStatusList);
  clusterRelated();
};
