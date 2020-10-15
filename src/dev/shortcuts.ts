import { Response } from "express";

import { api } from "app/backend";

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

const getLibResponses = (res: Response): Record<string, () => void> => ({
  fail: () => {
    res.status(500).send("SOMETHING WRONG");
  },
  invalid: () => {
    res.json(response.lib.invalid);
  },
  "invalid-json": () => {
    try {
      JSON.parse("{");
    } catch (e) {
      res.json(response.lib.invalidJson(e.message));
    }
  },
  "missing-key": () => {
    res.json(response.lib.missingKey);
  },
  "unknown-cmd": () => {
    res.json(response.lib.unknownCmd);
  },
  error: () => {
    res.json(
      response.lib.error([
        {
          severity: { level: "ERROR", force_code: null },
          message: {
            code: "DEFAULT_ERROR",
            message: "Default error from devel server",
            payload: { error: "default" },
          },
          context: null,
        },
        {
          severity: { level: "ERROR", force_code: null },
          message: {
            code: "ANOTHER_DEFAULT_ERROR",
            message: "Another Default error from devel server",
            payload: { error: "another default" },
          },
          context: null,
        },
      ]),
    );
  },
  success: () => {
    res.json(response.lib.success);
  },
});

export const libStd = ({
  code,
  res,
  errors = {},
}: {
  code: string;
  res: Response;
  errors?: Record<string, api.types.lib.Response["report_list"]>;
}) => {
  if (code in errors) {
    res.json(response.lib.error(errors[code]));
    return;
  }
  const stdResponses = getLibResponses(res);
  if (code in stdResponses) {
    stdResponses[code]();
    return;
  }
  stdResponses.success();
};
