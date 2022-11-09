import deepmerge from "deepmerge";

import * as types from "dev/types";

const overwriteMerge = (_destArr: unknown[], srcArr: unknown[]) => srcArr;

const service = {
  installed: true,
  running: true,
  enabled: true,
};

export const services = (
  diff: Partial<types.NodeServiceMap> = {},
): types.NodeServiceMap =>
  deepmerge<types.NodeServiceMap>(
    {
      pacemaker: service,
      pacemaker_remote: service,
      corosync: service,
      pcsd: service,
      sbd: service,
    },
    diff,
  );

export const node = (id: string, diff: Partial<types.Node> = {}): types.Node =>
  deepmerge<types.Node>(
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

export const resourceStatus = (
  id: string,
  diff: Partial<types.CrmStatus> = {},
): types.CrmStatus =>
  deepmerge<types.CrmStatus>(
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

export const operation = (
  id: string,
  diff: Partial<types.Operation>,
): types.Operation =>
  deepmerge<types.Operation>(
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

export const primitive = (
  id: string,
  diff: Partial<types.Primitive> = {},
): types.Primitive =>
  deepmerge<types.Primitive>(
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

export const crmStatus = (
  {
    resourceId,
    nodeId,
    nodeName,
  }: {
    resourceId: string;
    nodeId: string;
    nodeName: string;
  },
  diff: Partial<types.CrmStatus> = {},
): types.CrmStatus =>
  deepmerge<types.CrmStatus>(
    resourceStatus(resourceId, {
      resource_agent: "ocf:heartbeat:apache",
      managed: true,
      target_role: "Started",
      role: "Started",
      node: {
        id: nodeId,
        name: nodeName,
        cached: false,
      },
    }),
    diff || {},
  );

export const issues = (list: string[]) => list.map(message => ({message}));

export const stonith = (
  id: string,
  diff: Partial<types.Stonith> = {},
): types.Stonith =>
  deepmerge<types.Stonith>(
    {
      id,
      status: "running",
      class_type: "primitive",
      class: "stonith",
      agentname: "stonith:fence_apc",
      provider: null,
      type: "fence_apc",
      stonith: true,
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

export const group = (
  id: string,
  resources: types.Group["members"],
  diff: Partial<types.Group> = {},
): types.Group =>
  deepmerge<types.Group>(
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

export const clone = (
  id: string,
  member: types.Clone["member"],
  diff: Partial<types.Clone> = {},
): types.Clone =>
  deepmerge<types.Clone>(
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

export const cluster = (
  name: string,
  status: types.Cluster["status"] = "ok",
  diff: Partial<types.Cluster> = {},
): types.Cluster =>
  deepmerge<types.Cluster>(
    {
      cluster_name: name,
      status,
      node_list: [node("1"), node("2")],
      pcsd_capabilities: [],
      quorate: true,
      warning_list: [],
      error_list: [],
      resource_list: [],
      constraints: {},
      nodes_utilization: {
        "node-1": [
          {id: "R1_test_one", name: "test_one", value: "100"},
          {id: "R1_test_two", name: "test_two", value: "200"},
        ],
      },
    },
    diff || {},
    {arrayMerge: overwriteMerge},
  );
