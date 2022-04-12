import * as t from "io-ts";

import { ApiWithIssues } from "./issues";

export const ApiNodeName = t.string;

/*
name
  taken from result of `corosync-cmapctl runtime.votequorum.this_node_id`
status
  * unknown - default when it was not possible to connect node
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
    
tools like `systemctl` or `service` are used for getting services info
*/

export const ApiNode = t.intersection([
  ApiWithIssues,
  t.type({ name: ApiNodeName }),
  t.union([
    t.type({
      status: t.keyof({ unknown: null }),
    }),
    t.type({
      id: t.string,
      status: t.keyof({
        standby: null,
        online: null,
        offline: null,
      }),
      quorum: t.union([t.boolean, t.null]),
      uptime: t.string,
      services: t.record(
        t.keyof({
          pacemaker: null,
          pacemaker_remote: null,
          corosync: null,
          pcsd: null,
          sbd: null,
        }),
        t.type({
          installed: t.boolean,
          running: t.boolean,
          enabled: t.boolean,
        }),
      ),
      corosync: t.boolean,
      corosync_enabled: t.boolean,
      pacemaker: t.boolean,
      pacemaker_enabled: t.boolean,
      pcsd_enabled: t.boolean,
      sbd_config: t.union([
        t.null,
        t.partial({
          SBD_DELAY_START: t.string,
          SBD_OPTS: t.string,
          SBD_PACEMAKER: t.string,
          SBD_STARTMODE: t.string,
          SBD_TIMEOUT_ACTION: t.string,
          SBD_WATCHDOG_DEV: t.string,
          SBD_WATCHDOG_TIMEOUT: t.string,
          SBD_DEVICE: t.string,
        }),
      ]),
    }),
  ]),
]);
