/* eslint-disable camelcase */
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
interface ApiResourceOperation {
  id: string,
  call_id: number,
  crm_debug_origin: string|null,
  crm_feature_set: string|null,
  exec_time: number,
  exit_reason: string|null,
  interval: number,
  last_rc_change: number,
  last_run: number,
  on_node: string|null,
  op_digest: string|null,
  operation_key: string|null,
  operation: string|null,
  op_force_restart: string|null,
  op_restart_digest: string|null,
  op_status: number,
  queue_time: number,
  rc_code: number,
  transition_key: string|null,
  transition_magic: string|null,
}

export type ApiResourceId = string;

/*
datasource: crm_mon: /crm_mon/resources//resource
most attributes taken from xml element attributes
*/
interface ApiResourceStatus {
  id: ApiResourceId;
  resource_agent: string;
  managed: boolean;
  failed: boolean;
  role: "Started"|"Stopped"|"Master"|"Slave";
  active: boolean;
  orphaned: boolean;
  failure_ignored: boolean;
  nodes_running_on: number;
  panding: string;
  node: {
    name: string;
    id: string;
    cached: boolean;
  };
}

/*
disabled
  true - parent (group, clone) disabled | meta_attr "targed-role" is "stopped"
parent_id
  id of parent resource (group, clone); it is used internally in backend, for
  web ui is meaningless
*/
interface ApiResourceBase extends ApiWithIssues {
  id: ApiResourceId;
  class_type: string,
  status: "running"|"partially running"|"disabled"|"failed"|"blocked"|"unknown";
  meta_attr: ApiNVPair[];
  disabled: boolean;
  parent_id: null|string;
}

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
interface ApiPrimitiveBase extends ApiResourceBase {
  class_type: "primitive",
  class: string,
  provider: string|null,
  type: string,
  stonith: boolean,
  instance_attr: ApiNVPair[];
  crm_status: ApiResourceStatus[];
  operations: ApiResourceOperation[];
  utilization: ApiNVPair[];
}

/*
class
  must not be "stonith" - but how to express it in typescript, I haven't found
  a way (only some proposal)
*/
export interface ApiPrimitive extends ApiPrimitiveBase {
  stonith: false,
  provider: string,
}

/*
warning_list
  This fence-device has the "action" option set, it is recommended to set
  "pcmk_off_action", "pcmk_reboot_action" instead
    for each meta_attribute with name `action`
  This fence-device has the "method" option set to "cycle" which is
  potentially dangerous, please consider using "onoff"
    for eache meta_attribute with name `method` and value `cycle`
*/
export interface ApiStonith extends ApiPrimitiveBase {
  class: "stonith",
  stonith: true,
  provider: null;
}

/*
status (evaluated in following order - first win)
  * disabled - disabled is true
  * status of the first member - if the member is not in "running", "unknown"
  * partially running
    one of resources (except first) is in "disabled", "blocked", "failed"
  * running - by default
*/
export interface ApiGroup extends ApiResourceBase {
  class_type: "group",
  members: ApiResource[],
}

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
export interface ApiClone extends ApiResourceBase {
  class_type: "clone",
  member: ApiPrimitive|ApiGroup,
  promotable: boolean;
}

export type ApiResource = ApiPrimitive|ApiGroup|ApiClone|ApiStonith;
