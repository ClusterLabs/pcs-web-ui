/* eslint-disable camelcase */
import * as t from "io-ts";

import { ApiWithIssues } from "./issues";
import { ApiNVPair } from "./nvsets";

/*
datasource: /cib/status/node_state/lrm/lrm_resources/lrm_resource/lrm_rsc_op

description of attributes is not available in rng so:
  * numbers are converted in backend and don't need null fallback
  * strings are taken from xml element and when attribute does not exists a null
    value is returned

on_node
  if on_node taken from element attribute is empty it is searched for parent
  `node_state`. If such parent is found then its attribute `uname` is used.
*/
const ApiResourceOperation = t.type({
  id: t.string,
  call_id: t.number,
  crm_debug_origin: t.union([t.string, t.null]),
  crm_feature_set: t.union([t.string, t.null]),
  exec_time: t.number,
  exit_reason: t.union([t.string, t.null]),
  interval: t.number,
  last_rc_change: t.number,
  last_run: t.number,
  on_node: t.union([t.string, t.null]),
  op_digest: t.union([t.string, t.null]),
  operation_key: t.union([t.string, t.null]),
  operation: t.union([t.string, t.null]),
  op_force_restart: t.union([t.string, t.null]),
  op_restart_digest: t.union([t.string, t.null]),
  op_status: t.number,
  queue_time: t.number,
  rc_code: t.number,
  transition_key: t.union([t.string, t.null]),
  transition_magic: t.union([t.string, t.null]),
});

export const ApiResourceId = t.string;

/*
datasource: crm_mon: /crm_mon/resources//resource
most attributes taken from xml element attributes
*/
const ApiRole = t.keyof({
  Started: null,
  Stopped: null,
  Master: null,
  Slave: null,
});
const ApiResourceStatus = t.intersection([
  t.type({
    id: ApiResourceId,
    resource_agent: t.string,
    managed: t.boolean,
    failed: t.boolean,
    role: ApiRole,
    active: t.boolean,
    orphaned: t.boolean,
    failure_ignored: t.boolean,
    nodes_running_on: t.number,
    pending: t.string,
    node: t.type({
      name: t.string,
      id: t.string,
      cached: t.boolean,
    }),
  }),
  t.partial({
    target_role: ApiRole,
  }),
]);

/*
disabled
  true - parent (group, clone) disabled | meta_attr "targed-role" is "stopped"
parent_id
  id of parent resource (group, clone); it is used internally in backend, for
  web ui is meaningless
*/
const ApiResourceBase = t.intersection([ApiWithIssues, t.type({
  id: ApiResourceId,
  class_type: t.string,
  agentname: t.string,
  status: t.keyof({
    running: null,
    "partially running": null,
    disabled: null,
    failed: null,
    blocked: null,
    unknown: null,
  }),
  meta_attr: t.array(ApiNVPair),
  disabled: t.boolean,
  parent_id: t.union([t.string, t.null]),
})]);

/*
error_list, warning_list
  Failed to `operation` `resourceId` on `time` ...
    | any resource operation with operation attribute that is not monitor
      and rc_code is different from 0, 7
    | any resource operation with rc_code different from 0, 8, 193

    Issue is added to error_list when `status` attribute is failed. It is added
    to warning_list otherwise.`

status (evaluated in following order - first win)
  * disabled - disabled is true
  * running - in crm_status is at least one item with attribute active=true
  * failed
    | in crm_status is at least one item with attribute failed=true
    | any error in error_list
  * blocked - nothing above happened
  status can be modifeid during operation analysis aftermath
    * failed - when status was blocked and failed operation detected
*/
const ApiPrimitiveBase = t.intersection([ApiResourceBase, t.type({
  class_type: t.literal("primitive"),
  class: t.string,
  provider: t.union([t.string, t.null]),
  type: t.string,
  stonith: t.boolean,
  instance_attr: t.array(ApiNVPair),
  crm_status: t.array(ApiResourceStatus),
  operations: t.array(ApiResourceOperation),
  utilization: t.array(ApiNVPair),
})]);

/*
class
  must not be "stonith" - but how to express it in typescript, I haven't found
  a way (only some proposal)
*/
export const ApiPrimitive = t.intersection([ApiPrimitiveBase, t.type({
  stonith: t.literal(false),
  provider: t.string,
})]);

/*
warning_list
  This fence-device has the "action" option set, it is recommended to set
  "pcmk_off_action", "pcmk_reboot_action" instead
    for each meta_attribute with name `action`
  This fence-device has the "method" option set to "cycle" which is
  potentially dangerous, please consider using "onoff"
    for eache meta_attribute with name `method` and value `cycle`
*/
export const ApiStonith = t.intersection([ApiPrimitiveBase, t.type({
  class: t.literal("stonith"),
  stonith: t.literal(true),
  provider: t.null,
})]);

/*
status (evaluated in following order - first win)
  * disabled - disabled is true
  * status of the first member - if the member is not in "running", "unknown"
  * partially running
    one of resources (except first) is in "disabled", "blocked", "failed"
  * running - by default
*/
export const ApiGroup = t.intersection([ApiResourceBase, t.type({
  class_type: t.literal("group"),
  members: t.array(t.union([ApiPrimitive, ApiStonith])),
})]);

/*
datasources
 cib: /cib/configuration/resources/clone
 crm_mon: /crm_mon/resources//clone[@id='#{@id}']

warning_list
  Resource is promotable but has not been promoted on any node
  type: "no_master"
  promotable without promoted primitive and not disabled

status (evaluated in following order - first win)
  * disabled - disabled is true
  * partially_running - member is running and no primitive is promoted
  * member.status

some attributes are set internally in backend (unique, managed, failed,
failure_ignored are gained from crm_mon status) but then they are filtered out
and not propagated to response:
  unique: boolean;
  masters_unknown: boolean;
  masters: string[];
  slaves: string[];
  managed: boolean;
  failed: boolean;
  failure_ignored: boolean;
warning_list
  Resource is promotable but has not been promoted on any node
    type: "no_master";
    promotable without promoted primitive and not disabled
*/
export const ApiClone = t.intersection([ApiResourceBase, t.type({
  class_type: t.literal("clone"),
  member: t.union([ApiPrimitive, ApiGroup]),
  promotable: t.boolean,
})]);

export const ApiResource = t.union([
  ApiPrimitive,
  ApiGroup,
  ApiClone,
  ApiStonith,
]);
