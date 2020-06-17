const deepmerge = require("deepmerge");

const overwriteMerge = (destArr, srcArr /* , opts */) => srcArr;

const service = {
  installed: true,
  running: true,
  enabled: true,
};

const node = (id, diff) =>
  deepmerge(
    {
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
      sbd_config: {},
    },
    diff || {},
  );

const resourceStatus = (id, diff) =>
  deepmerge(
    {
      id,
      resource_agent: "ocf:heartbeat:Dummy",
      managed: true,
      failed: false,
      role: "Started",
      active: true,
      orphaned: false,
      failure_ignored: false,
      nodes_running_on: 1,
      pending: null,
      node: null,
    },
    diff || {},
  );

const operation = (id, diff) =>
  deepmerge(
    {
      id,
      call_id: 1,
      crm_debug_origin: null,
      crm_feature_set: null,
      exec_time: 10,
      exit_reason: null,
      interval: 30,
      last_rc_change: 35,
      last_run: 40,
      on_node: null,
      op_digest: null,
      operation_key: null,
      operation: null,
      op_force_restart: null,
      op_restart_digest: null,
      op_status: 20,
      queue_time: 50,
      rc_code: 0,
      transition_key: null,
      transition_magic: null,
    },
    diff || {},
  );

const resource = (id, diff) =>
  deepmerge(
    {
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
    },
    diff || {},
  );

const issues = list => list.map(message => ({ message }));

const stonith = (id, diff) =>
  resource(id, {
    ...diff,
    class_type: "primitive",
    class: "stonith",
    type: "fence_apc",
    stonith: true,
    provider: null,
  });

const group = (id, resources, diff) =>
  deepmerge(
    {
      id,
      status: "running",
      class_type: "group",
      members: resources,
      warning_list: [],
      error_list: [],
      meta_attr: [],
      disabled: false,
      parent_id: null,
    },
    diff || {},
  );

const clone = (id, member, diff) =>
  deepmerge(
    {
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
    },
    diff || {},
  );

const cluster = (name, status, diff) =>
  deepmerge(
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

module.exports = {
  node,
  resource,
  issues,
  stonith,
  group,
  clone,
  cluster,
  resourceStatus,
  operation,
};
