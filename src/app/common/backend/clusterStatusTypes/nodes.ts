/* eslint-disable camelcase */
import * as t from "io-ts";

import { TApiWithIssues } from "./issues";
import { TApiNVPair } from "./nvsets";

// tools like `systemctl` or `service` are used for getting services info
const TApiNodeService = t.type({
  installed: t.boolean,
  runnning: t.boolean,
  enabled: t.boolean,
});

export const TApiNodeName = t.string;
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
export const TApiNode = t.intersection([TApiWithIssues, t.type({
  name: t.string,
  status: t.keyof({ standby: null, online: null, offline: null }),
  quorum: t.boolean,
  uptime: t.string,
  services: t.type({
    pacemaker: TApiNodeService,
    pacemaker_remote: TApiNodeService,
    corosync: TApiNodeService,
    pcsd: TApiNodeService,
    sbd: TApiNodeService,
  }),
  corosync: t.boolean,
  corosync_enabled: t.boolean,
  pacemaker: t.boolean,
  pacemaker_enabled: t.boolean,
  pcsd_enabled: t.boolean,
  sbd_config: t.type({
  }),
})]);

// datasource: /cib/configuration/nodes/node/instance_attributes/nvpair
// The key of record is "uname".
export const TApiNodeAttributes = t.record(t.string, t.array(TApiNVPair));

// datasource: /cib/configuration/nodes/node/utilization/nvpair
// The key of record is "uname".
export const TApiNodesUtilization = t.record(t.string, t.array(TApiNVPair));
