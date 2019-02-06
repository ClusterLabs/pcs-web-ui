const GET = "get";

const clustersOverview = {
  url: "/clusters_overview",
  method: GET,
  handler: (_, res) => {
    res.json({
      cluster_list: [
        {
          cluster_name: "first",
        },
        {
          cluster_name: "second",
        },
      ],
    });
  },
};

const clusterStatus = {
  url: "/managec/first/cluster_status",
  method: GET,
  handler: (_, res) => {
    res.json({
      cluster_name: "first",
      error_list: [],
      warning_list: [],
      quorate: false,
      status: "error",
      node_list: [],
      resource_list: [],
      groups: [],
      constraints: {
        rsc_location: [
          {
            id: "location-R1-bat28-10",
            node: "bat28",
            rsc: "R1",
            score: "10",
          },
        ],
      },
      cluster_settings: {
        "have-watchdog": "false",
        "dc-version": "1.1.18-2.fc28.1-2b07d5c5a9",
        "cluster-infrastructure": "corosync",
        "cluster-name": "zoo28",
      },
      need_ring1_address: false,
      is_cman_with_udpu_transport: false,
      acls: {
        role: {},
        group: {},
        user: {},
        target: {},
      },
      username: "hacluster",
      fence_levels: {},
      node_attr: {},
      nodes_utilization: {},
      alerts: [],
      known_nodes: ["ape28", "bat28"],
      corosync_online: [],
      corosync_offline: ["ape28", "bat28"],
      pacemaker_online: ["ape28"],
      pacemaker_offline: ["bat28"],
      pacemaker_standby: [],
      status_version: "2",
    });
  },
};

module.exports = {
  display: [
    clustersOverview,
  ],
  goToCluster: [
    clustersOverview,
    clusterStatus,
  ],
};
