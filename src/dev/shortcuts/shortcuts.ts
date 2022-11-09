import {app} from "dev/app";
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
    res.json(response.lib.success({data: availableResourceAgents}));
  });

const getAvailStonithAgents = (
  availableStonithAgents: types.StonithAgentListAgents,
) =>
  app.libClusterStonithAgentListAgents((_req, res) => {
    res.json(response.lib.success({data: availableStonithAgents}));
  });

const getResourceAgentMetadata = (
  metadatList: types.ResourceAgentDescribeAgent[],
) =>
  app.libClusterResourceAgentDescribeAgent((req, res) => {
    const metadata = metadatList.find(m => m.name === req.body.agent_name);
    if (metadata) {
      res.json(response.lib.success({data: metadata}));
    } else {
      res.status(404).send("Not found");
    }
  });

const getFenceAgentMetadata = (
  metadatList: types.StonithAgentDescribeAgent[],
) =>
  app.libClusterStonithAgentDescribeAgent((req, res) => {
    const metadata = metadatList.find(
      m => m.name === `stonith:${req.body.agent_name}`,
    );
    if (metadata) {
      res.json(response.lib.success({data: metadata}));
    } else {
      res.status(404).send("Not found");
    }
  });

const getClusterPropertiesDefinition = (properties: types.ClusterProperties) =>
  app.getClusterPropertiesDefinition((_req, res) => {
    res.json(properties);
  });

const getPermissions = (permissions: types.ClusterPermissions) =>
  app.getPermissions((_req, res) => {
    res.json(permissions);
  });
// advanced

export const clusterRelated = () => {
  getAvailResourceAgents(response.resourceAgentListWithoutDescribe.ok);
  getAvailStonithAgents(response.stonithAgentListWithoutDescribe.ok);
  getResourceAgentMetadata([
    response.resourceAgentMetadata.ocfHeartbeatApache,
    response.resourceAgentMetadata.ocfHeartbeatDummy,
  ]);
  getFenceAgentMetadata([response.fenceAgentMetadata.ok]);
  getClusterPropertiesDefinition(response.clusterProperties.ok);
  getPermissions(response.permissions());
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
