/* eslint-disable camelcase */
import * as t from "io-ts";

import { ApiWithIssues } from "./issues";
import { ApiAcl } from "./acls";
import { ApiAlert } from "./alerts";
import { ApiConstraints } from "./constraints";
import { ApiResource } from "./resources";
import { ApiResourceId } from "./common";
import {
  ApiNodeName,
  ApiNode,
  ApiNodeAttributes,
  ApiNodesUtilization,
} from "./nodes";

/*
datasource: /cib/configuration/fencing-topology/fencing-level
The key of record is a target.
*/
const ApiFencingLevels = t.record(t.string, t.type({
  level: t.string,
  devices: t.array(t.string),
}));

export const ApiClusterStatusFlag = t.keyof({
  unknown: null,
  ok: null,
  warning: null,
  error: null,
});


/*
datasource: /cib/configuration/crm_config//nvpair
The key of record is a attribute name.
*/
const ApiSettings = t.record(t.string, t.string);

export const ApiClusterName = t.string;
/*
alerts - null it the case of not running cluster

status (aggregation attribute)
 * unknown
    | no node that is assigned to a cluster in pcs_settings currently belongs
      to the cluster (every node belongs to another cluster)
    | all nodes has version 1 status format (without quorum); not
      supported in client (i.e. here)
  * error
    | there are some error in error_list
    | attribute quorate is false
    | some node has an error in error_list
    | some node has status "error" or "offline"
    | some resource has status "failed", "blocked"
  * warning
    | some warning in warining_list
    | some node has a warning in warning_list
    | some resource has status "partially running"
  * ok - nothing prevous happen

warning_list
  No fencing configured in the cluster
    quorate is true & no stonith and no seb_enabled!
  Stonith is not enabled
    quorate is true & cluster_settings.stonith-enabled exists and is not truthy
    value
  SBD is enabled but not running. Restart of cluster is required.
    quorate is true & some nodes with enabled sbd but no node with sbd running
  SBD is disabled but still running. Restart of cluster is required.
    quorate is true & no enabled sbd but some running sbd
  SBD is not enabled on node(s)...
    type: sbd_not_enabled_on_all_nodes
    node_list
    quorate is true & some nodes has sbd enabled and some disabled
  Not authorized against node(s)...
    type: nodes_not_authorized
    node_list
    quorate is true & any no-authorized node (node that have key "notoken" or
    "notauthorized" in a "/remote/status" response)

quorate
  true - cluster status is built by node with quorum
  theoretically, there can be null but it is not supported in client (i.e. here)

node_list
  all nodes no matter what status
*/
export const ApiClusterStatus = t.intersection([
  ApiWithIssues,
  t.type({
    available_features: t.array(t.string),
    cluster_name: ApiClusterName,
    node_list: t.array(ApiNode),
    pcsd_capabilities: t.array(t.string),
    quorate: t.boolean,
    resource_list: t.array(ApiResource),
    status: ApiClusterStatusFlag,
  }),
  t.partial({
    acls: ApiAcl,
    alerts: t.union([t.array(ApiAlert), t.null]),
    cluster_settings: ApiSettings,
    constraints: ApiConstraints,
    corosync_offline: t.array(ApiNodeName),
    corosync_online: t.array(ApiNodeName),
    fence_levels: ApiFencingLevels,
    groups: t.array(ApiResourceId),
    known_nodes: t.array(ApiNodeName),
    node_attr: ApiNodeAttributes,
    nodes_utilization: ApiNodesUtilization,
    pacemaker_offline: t.array(ApiNodeName),
    pacemaker_online: t.array(ApiNodeName),
    pacemaker_standby: t.array(ApiNodeName),
    status_version: t.string,
    username: t.string,
  }),
]);
