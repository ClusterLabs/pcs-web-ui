import {Cluster} from "dev/types";
import {firstSet as aclFirstSet} from "dev/responses/acl";

import {cluster, node} from "./tools";
import {constraints} from "./constraints";
import {resourceTree as resourceTreeResources} from "./resources/resource-tree";

export const resourceTree: Cluster = cluster("resourceTree", "ok", {
  node_list: [
    node("1", {
      services: {
        pacemaker: {
          installed: true,
          running: false,
          enabled: true,
        },
        pacemaker_remote: {
          installed: false,
          running: false,
          enabled: false,
        },
        corosync: {
          installed: true,
          running: true,
          enabled: true,
        },
        pcsd: {
          installed: true,
          running: true,
          enabled: false,
        },
        sbd: {
          installed: false,
          running: false,
          enabled: false,
        },
      },
    }),
    node("2", {
      error_list: [
        {
          message: "Test error",
        },
      ],
      warning_list: [
        {
          message: "Test warning 1",
        },
        {
          message: "Test warning 2",
        },
      ],
    }),
  ],
  cluster_settings: {
    "placement-strategy": "default",
    // "placement-strategy": "utilization",
  },
  nodes_utilization: {
    "node-1": [
      {
        id: "Node-1-utilization-cpu-2",
        name: "cpu",
        value: "2",
      },
      {
        id: "Node-1-utilization-memory-4096",
        name: "memory",
        value: "4096",
      },
    ],
  },
  resource_list: resourceTreeResources,
  acls: aclFirstSet,
  constraints,
  pacemaker_standby: ["node-1"],
  node_attr: {
    "node-1": [
      {
        id: "node-1-attr",
        name: "maintenance",
        value: "yes",
      },
    ],
  },
});
