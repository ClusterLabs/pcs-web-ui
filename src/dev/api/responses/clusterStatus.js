const deepmerge = require("deepmerge");

const overwriteMerge = (destArr, srcArr/* , opts */) => srcArr;

const service = {
  installed: true,
  running: true,
  enabled: true,
};

const node = (id, diff) => deepmerge({
  id,
  name: `node-${id}`,
  status: "online",
  uptime: "5 days, 12:34:56",
  services: {
    pacemaker: service,
    pacemaker_remote: service,
    corosync: service,
    pcsd: service,
    sbd: service,
  },
  quorum: true,
  warning_list: [],
  error_list: [],
  corosync: true,
  corosync_enabled: true,
  pacemaker: true,
  pacemaker_enabled: true,
  pcsd_enabled: true,
  sbd_config: {
  },
}, diff || {});

const resource = (id, diff) => deepmerge({
  id,
  status: "running",
  class_type: "primitive",
  class: "ocf",
  agentname: "ocf:heartbeat:Dummy",
  provider: "heartbeat",
  type: "Dummy",
  stonith: false,
  instance_attr: [],
  warning_list: [],
  error_list: [],
  meta_attr: [],
  crm_status: [],
  operations: [],
  utilization: [],
  disabled: false,
  parent_id: null,
}, diff || {});

const issues = list => list.map(message => ({ message }));

const stonith = (id, diff) => resource(id, {
  ...diff,
  class_type: "primitive",
  class: "stonith",
  stonith: true,
  provider: null,
});

const group = (id, resources, diff) => deepmerge({
  id,
  status: "running",
  class_type: "group",
  members: resources,
  warning_list: [],
  error_list: [],
  meta_attr: [],
  disabled: false,
  parent_id: null,
}, diff || {});

const clone = (id, member, diff) => deepmerge({
  id,
  status: "running",
  class_type: "clone",
  member,
  warning_list: [],
  error_list: [],
  meta_attr: [],
  disabled: false,
  parent_id: null,
  promotable: false,
}, diff || {});


const cluster = (name, status, diff) => deepmerge(
  {
    cluster_name: name,
    status,
    node_list: [node(1), node(2)],
    available_features: [],
    pcsd_capabilities: [],
    quorate: true,
    warning_list: [],
    error_list: [],
    resource_list: [],
    constraints: {},
  },
  diff || {},
  { arrayMerge: overwriteMerge },
);

const clusterOk = clusterName => cluster(clusterName, "ok", {
  resource_list: [
    resource("R1"),
    stonith("F1"),
  ],
});

const resourceTree = cluster("resourceTree", "ok", {
  resource_list: [
    resource("A", {
      type: "apache",
      error_list: [
        {
          message: "Failed to monitor A on Mon Oct 14 14:00:07 CEST 2019",
        },
      ],
      instance_attr: [
        {
          id: "A-instance_attributes-configfile",
          name: "configfile",
          value: "/etc/apache/httpd.conf",
        },
      ]
    }),
    group("GROUP-1", [
      resource("B"),
      resource("C"),
    ]),
    clone(
      "Clone-1",
      group(
        "GROUP-2",
        [
          resource("D", { status: "blocked" }),
          resource("E", { status: "blocked" }),
        ],
        { status: "blocked" }
      ),
      {
        status: "blocked",
        error_list: [
          {
            message: "Failed to monitor Clone-1 on Mon Oct 14 14:00:07 CEST 2019",
          },
        ],
      },
    ),
    clone("Clone-2", resource("F")),
  ],
  constraints: {
    rsc_colocation: [
      {
        id: "colocation-A-G1-INFINITY",
        rsc: "A",
        score: "INFINITY",
        "with-rsc": "GROUP-1",
      }
    ],
    rsc_location: [
      {
        id: "cli-prefer-A",
        node: "node-1",
        role: "Started",
        rsc: "A",
        score: "INFINITY"
      },
      {
        id: "G-prefer-node-1",
        node: "node-1",
        "rsc-pattern": "G.*",
        score: "INFINITY",
      },
      {
        id: "cli-prefer-A-1",
        rule_string: "date gt 2019-11-28 and date lt 2019-12-01",
        role: "Started",
        rsc: "A",
      }
    ],
    "rsc_order": [
      {
        "first": "A",
        "first-action": "start",
        "id": "order-A-G1-mandatory",
        "then": "GROUP-1",
        "then-action": "start"
      }
    ]
  }
});

const clusterError = cluster("error", "error", {
  node_list: [
    node(1),
    node(2, { status: "offline", quorum: false }),
    node(3, { status: "offline", quorum: false })
  ],
  resource_list: [
    resource("R1", {
      status: "blocked",
      warning_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    resource("R2", { status: "failed" }),
    stonith("F1"),
    stonith("F2", { status: "failed" }),
  ],
  warning_list: issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
  ]),
  error_list: issues([
    "Unable to connect to the cluster.",
  ]),
});

const clusterBig = cluster("big", "error", {
  node_list: [
    node(1),
    node(2, { status: "offline", quorum: false }),
    node(3, { status: "offline", quorum: false }),
    node(4),
    node(5, { status: "offline", quorum: false }),
    node(6),
    node(7),
    node(8, { status: "offline", quorum: false }),
    node(9, { status: "offline", quorum: false }),
  ],
  resource_list: [
    resource("ip-addr", {
      status: "blocked",
      warning_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
      error_list: issues([
        "Failed to start R1 on Tue Feb 26 10:07:50 2019 on node node-3:",
      ]),
    }),
    resource("apache", { status: "failed" }),
    resource("pgsql", { status: "failed" }),
    resource("nagios"),
    resource("postfix", { status: "blocked" }),
    stonith("F1"),
    stonith("F2", { status: "failed" }),
  ],
  warning_list: issues([
    "No fencing configured in the cluster",
    "Not authorized against node(s) node-3",
    "Unreal warning 1",
    "Unreal warning 2",
    "Unreal warning 3",
    "Unreal warning 4",
  ]),
  error_list: issues([
    "Unable to connect to the cluster.",
    "Unreal error 1",
    "Unreal error 2",
    "Unreal error 3",
  ]),
});

const empty = cluster("empty", "error", { node_list: [node(1)] });


module.exports = {
  ok: clusterOk("ok"),
  error: clusterError,
  big: clusterBig,
  ok2: clusterOk("ok2"),
  resourceTree: resourceTree,
  empty,
};
