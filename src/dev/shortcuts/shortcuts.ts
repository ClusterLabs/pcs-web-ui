import { app } from "dev/app";
import * as response from "dev/responses";
import * as types from "dev/types";

// basic
export const importedClusterList = (
  importedClusters: types.ImportedClusterList,
) =>
  app.importedClusterList((_req, res) => {
    res.json(importedClusters);
  });

const clusterStatus = (clusterStatusList: types.Cluster[]) =>
  app.clusterStatus((req, res) => {
    const cluster = clusterStatusList.find(
      c => c.cluster_name === req.params.clusterName,
    );
    if (cluster) {
      res.json(cluster);
    } else {
      res.status(404).send("Not found");
    }
  });

const getAvailResourceAgents = (
  availableResourceAgents: types.ResourceAgentListAgents,
) =>
  app.libClusterResourceAgentListAgents((_req, res) => {
    res.json(response.lib.success({ data: availableResourceAgents }));
  });

const getResourceAgentMetadata = (
  metadatList: types.ResourceAgentMetadata[],
) => {
  return app.getResourceAgentMetadata((req, res) => {
    const metadata = metadatList.find(m => m.name === req.query.agent);
    if (metadata) {
      res.json(metadata);
    } else {
      res.status(404).send("Not found");
    }
  });
};

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
  getAvailResourceAgents(response.resourceAgentListWithoutDescribe.ok);
  getResourceAgentMetadata([
    response.resourceAgentMetadata.ocfHeartbeatApache,
    response.resourceAgentMetadata.ocfHeartbeatDummy,
  ]);
  getFenceAgentMetadata([response.fenceAgentMetadata.ok]);
  clusterProperties(response.clusterProperties.ok);
};

export const dashboard = (clusterStatusList: types.Cluster[]) => {
  importedClusterList(
    response.importedClusterList.withClusters(
      clusterStatusList.map(c => c.cluster_name),
    ),
  );
  clusterStatus(clusterStatusList);
  clusterRelated();
};
