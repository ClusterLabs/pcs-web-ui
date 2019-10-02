/* eslint-disable camelcase */
import { ApiWithIssues } from "./issues";
import { ApiAcl } from "./acls";
import { ApiAlert } from "./alerts";
import { ApiConstraints } from "./constraints";
import { ApiResource, ApiResourceId } from "./resources";
import {
  ApiNodeName,
  ApiNode,
  ApiNodeAttributes,
  ApiNodesUtilization,
} from "./nodes";

/*
datasource: /cib/configuration/fencing-topology/fencing-level
*/
interface ApiFencingLevels {
  [target: string]: { level: string, devices: string }[],
}


/*
datasource: /cib/configuration/crm_config//nvpair
*/
interface ApiSettings {
  [attribute: string]: string;
}


/*
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
export interface ApiClusterStatus extends ApiWithIssues{
  acls?: ApiAcl;
  alerts?: ApiAlert[];
  available_features: string[];
  cluster_name: string;
  cluster_settings?: ApiSettings;
  constraints?: ApiConstraints;
  corosync_offline?: ApiNodeName[];
  corosync_online?: ApiNodeName[];
  fence_levels?: ApiFencingLevels;
  groups?: ApiResourceId[];
  known_nodes?: ApiNodeName[];
  node_attr?: ApiNodeAttributes;
  node_list: ApiNode[];
  nodes_utilization?: ApiNodesUtilization,
  pacemaker_offline?: ApiNodeName[];
  pacemaker_online?: ApiNodeName[];
  pacemaker_standby?: ApiNodeName[];
  pcsd_capabilities: string[];
  quorate: boolean;
  resource_list: ApiResource[];
  status: "unknown"|"ok"|"warning"|"error";
  status_version?: string;
  username?: string;
}
