/* eslint-disable camelcase */
import { ApiWithIssues } from "./issues";
import { ApiNVPair } from "./nvsets";

// tools like `systemctl` or `service` are used for getting services info
interface ApiNodeService {
  installed: boolean;
  runnning: boolean;
  enabled: boolean;
}

export type ApiNodeName = string;
/*
name
  taken from result of `corosync-cmapctl runtime.votequorum.this_node_id`
status
  * offline - when corosync or pacemaker doesn't run
  * standby - when attribute "standby" of cib://node[@id='#{id}'] has value true
  * online - default
quorum - according cib://current_dc[@with_quorum="true"]
uptime - format is: %d day%s, %02d:%02d:%02d -> 5 days, 12:34:56
corosync, corosync_enabled, pacemaker, pacemaker_enabled, pcsd_enabled
  duplicit informations
  values taken from corresponding attributes of `services`
sbd_config
  TODO:
  structure from settings.sbd_config is translated by
  pcs.lib.tools#environment_file_to_dict
  example:
    {
      SBD_DELAY_START: "no"
      SBD_MOVE_TO_ROOT_CGROUP: "auto"
      SBD_OPTS: ""
      SBD_PACEMAKER: "yes"
      SBD_STARTMODE: "always"
      SBD_TIMEOUT_ACTION: "flush,reboot"
      SBD_WATCHDOG_DEV: "/dev/watchdog"
      SBD_WATCHDOG_TIMEOUT: "5"
    }
warning_list
  Not authorized against node(s)...
    type: nodes_not_authorized
    node_list
    from this very node "check" to all cluster node is called; some node(s) had
    "notauthorized" or "notoken" in response
*/
export interface ApiNode extends ApiWithIssues {
  name: string,
  status: "standby"|"online"|"offline";
  quorum: boolean,
  uptime: string;
  services: {
    pacemaker: ApiNodeService;
    pacemaker_remote: ApiNodeService;
    corosync: ApiNodeService;
    pcsd: ApiNodeService;
    sbd: ApiNodeService;
  },
  corosync: boolean,
  corosync_enabled: boolean,
  pacemaker: boolean,
  pacemaker_enabled: boolean,
  pcsd_enabled: boolean,
  sbd_config: {
  },
}

// datasource: /cib/configuration/nodes/node/instance_attributes/nvpair
export interface ApiNodeAttributes {
  [uname: string]: ApiNVPair[],
}

// datasource: /cib/configuration/nodes/node/utilization/nvpair
export interface ApiNodesUtilization {
  [uname: string]: ApiNVPair[],
}
