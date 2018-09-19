const service = () => ({"installed":true, "running":true, "enabled":false});
const node = (id, name) => ({
  "id": id,
  "error_list":[],
  "warning_list":[],
  "status":"online",
  "quorum":false,
  "uptime":"0 days, 11:58:13",
  "name": name,
  "services":{
    "pacemaker": service(),
    "pacemaker_remote": service(),
    "corosync": service(),
    "pcsd": service(),
    "cman": service(),
    "sbd": service()
  },
  "corosync":true,
  "pacemaker":true,
  "cman":false,
  "corosync_enabled":false,
  "pacemaker_enabled":false,
  "pcsd_enabled":false,
  "sbd_config":{
    "SBD_PACEMAKER":"yes",
    "SBD_STARTMODE":"clean",
    "SBD_DELAY_START":"no",
    "SBD_WATCHDOG_DEV":"/dev/watchdog",
    "SBD_WATCHDOG_TIMEOUT":"5",
    "SBD_OPTS":""
  },
  "status_version":"2",
});
const resource = (id, cls, provider, type, stonith) => ({
  "id": id,
  "error_list":[],
  "warning_list":[],
  "class_type":"primitive",
  "status":"blocked",
  "meta_attr":[],
  "parent_id":null,
  "disabled":false,
  "agentname": `${cls}:${provider}:${type}`,
  "provider":provider,
  "type":type,
  "stonith":stonith,
  "utilization":[],
  "instance_attr":[],
  "class":cls,
  "crm_status":[{
    "id":id,
    "resource_agent": `${cls}:${provider}:${type}`,
    "managed":true,
    "failed":false,
    "role":"Stopped",
    "active":false,
    "orphaned":false,
    "failure_ignored":false,
    "nodes_running_on":0,
    "pending":null,
    "node":null
  }],
  "operations":[{
    "call_id":5,
    "crm_debug_origin":"do_update_resource",
    "crm_feature_set":"3.0.14",
    "exec_time":35,
    "exit_reason":"",
    "id":"R1_last_0",
    "interval":0,
    "last_rc_change":1534703605,
    "last_run":1534703605,
    "on_node":"ape28",
    "op_digest":"f2317cad3d54cec5d7d7aa7d0bf35cf8",
    "operation_key":"R1_monitor_0",
    "operation":"monitor",
    "op_force_restart":" state ",
    "op_restart_digest":"f2317cad3d54cec5d7d7aa7d0bf35cf8",
    "op_status":0,
    "queue_time":0,
    "rc_code":7,
    "transition_key":"2:0:7:bc7056c1-cf81-4cf0-b20d-f70cae543c0b",
    "transition_magic":"0:7;2:0:7:bc7056c1-cf81-4cf0-b20d-f70cae543c0b"
  }]
});

const clusterStatus = (name) => ({
  "cluster_name":name,
  "error_list":[],
  "warning_list":[],
  "quorate":false,
  "status":"error",
  "node_list":[
    node(0, "ant"),
    node(1, "bee"),
  ],
  "resource_list":[
    resource("R1", "ocf", "heartbeat", "Dummy", /*stonith*/false),
    resource("xvm_fencing", "stonith", null, "fence_xvm", /*stonith*/true)
  ],
  "groups":[],
  "constraints":{
    "rsc_location":[{
      "id":"location-R1-bat28-10",
      "node":"bat28",
      "rsc":"R1",
      "score":"10"
    }]
  },
  "cluster_settings":{
    "have-watchdog":"false",
    "dc-version":"1.1.18-2.fc28.1-2b07d5c5a9",
    "cluster-infrastructure":"corosync",
    "cluster-name":"zoo28"
  },
  "need_ring1_address":false,
  "is_cman_with_udpu_transport":false,
  "acls":{
    "role":{},
    "group":{},
    "user":{},
    "target":{}
  },
  "username":"hacluster",
  "fence_levels":{},
  "node_attr":{},
  "nodes_utilization":{},
  "alerts":[],
  "known_nodes":["ape28", "bat28"],
  "corosync_online":[],
  "corosync_offline":["ape28", "bat28"],
  "pacemaker_online":["ape28"],
  "pacemaker_offline":["bat28"],
  "pacemaker_standby":[],
  "status_version":"2"
})

const clusterProperties = () => ({
  "no-quorum-policy":{
    "name":"no-quorum-policy",
    "shortdesc":"What to do when the cluster does not have quorum",
    "longdesc":"",
    "type":"enum",
    "default":"stop",
    "enum":[
      "stop",
      "freeze",
      "ignore",
      "suicide"
    ],
    "source":"pengine",
    "advanced":false,
    "readable_name":"No Quorum Policy",
    "value":"ignore"
  },
  "symmetric-cluster":{
    "name":"symmetric-cluster",
    "shortdesc":"All resources can run anywhere by default",
    "longdesc":"",
    "type":"boolean",
    "default":"true",
    "source":"pengine",
    "advanced":false,
    "readable_name":"Symmetric",
    "value":null
  },
  "default-resource-stickiness":{
    "name":"default-resource-stickiness",
    "shortdesc":"Deprecated (use resource-stickiness in rsc_defaults instead)",
    "longdesc":"",
    "type":"integer",
    "default":"(null)",
    "source":"pengine",
    "advanced":true,
    "readable_name":"default-resource-stickiness",
    "value":null
  },
  "is-managed-default":{
    "name":"is-managed-default",
    "shortdesc":"Deprecated (use is-managed in rsc_defaults instead)",
    "longdesc":"",
    "type":"boolean",
    "default":"(null)",
    "source":"pengine",
    "advanced":true,
    "readable_name":"is-managed-default",
    "value":null
  },
  "maintenance-mode":{
    "name":"maintenance-mode",
    "shortdesc":"Should the cluster monitor resources and start/stop them as required",
    "longdesc":"",
    "type":"boolean",
    "default":"false",
    "source":"pengine",
    "advanced":true,
    "readable_name":"maintenance-mode",
    "value":null
  },
  "start-failure-is-fatal":{
    "name":"start-failure-is-fatal",
    "shortdesc":"Always treat start failures as fatal",
    "longdesc":"When set to TRUE, the cluster will immediately ban a resource from a node if it fails to start there. When FALSE, the cluster will instead check the resource's fail count against its migration-threshold.",
    "type":"boolean",
    "default":"true",
    "source":"pengine",
    "advanced":false,
    "readable_name":"Start Failure is Fatal",
    "value":null
  },
  "enable-startup-probes":{
    "name":"enable-startup-probes",
    "shortdesc":"Should the cluster check for active resources during startup",
    "longdesc":"",
    "type":"boolean",
    "default":"true",
    "source":"pengine",
    "advanced":true,
    "readable_name":"enable-startup-probes",
    "value":null
  },
  "stonith-enabled":{
    "name":"stonith-enabled",
    "shortdesc":"Failed nodes are STONITH'd",
    "longdesc":"",
    "type":"boolean",
    "default":"true",
    "source":"pengine",
    "advanced":false,
    "readable_name":"Stonith Enabled",
    "value":null
  },
  "stonith-action":{
    "name":"stonith-action",
    "shortdesc":"Action to send to STONITH device",
    "longdesc":"",
    "type":"enum",
    "default":"reboot",
    "enum":[
      "reboot",
      "poweroff",
      "off"
    ],
    "source":"pengine",
    "advanced":false,
    "readable_name":"Stonith Action",
    "value":null
  },
  "stonith-timeout":{
    "name":"stonith-timeout",
    "shortdesc":"How long to wait for the STONITH action (reboot, on, off) to complete",
    "longdesc":"",
    "type":"time",
    "default":"60s",
    "source":"pengine",
    "advanced":true,
    "readable_name":"stonith-timeout",
    "value":null
  },
  "have-watchdog":{
    "name":"have-watchdog",
    "shortdesc":"Enable watchdog integration",
    "longdesc":"Set automatically by the cluster if SBD is detected.  User configured values are ignored.",
    "type":"boolean",
    "default":"false",
    "source":"pengine",
    "advanced":true,
    "readable_name":"have-watchdog",
    "value":"false"
  },
  "concurrent-fencing":{
    "name":"concurrent-fencing",
    "shortdesc":"Allow performing fencing operations in parallel",
    "longdesc":"",
    "type":"boolean",
    "default":"false",
    "source":"pengine",
    "advanced":true,
    "readable_name":"concurrent-fencing",
    "value":null
  },
  "startup-fencing":{
    "name":"startup-fencing",
    "shortdesc":"STONITH unseen nodes",
    "longdesc":"Advanced Use Only!  Not using the default is very unsafe!",
    "type":"boolean",
    "default":"true",
    "source":"pengine",
    "advanced":true,
    "readable_name":"startup-fencing",
    "value":null
  },
  "cluster-delay":{
    "name":"cluster-delay",
    "shortdesc":"Round trip delay over the network (excluding action execution)",
    "longdesc":"The \"correct\" value will depend on the speed and load of your network and cluster nodes.",
    "type":"time",
    "default":"60s",
    "source":"pengine",
    "advanced":false,
    "readable_name":"Cluster Delay",
    "value":null
  },
  "batch-limit":{
    "name":"batch-limit",
    "shortdesc":"The number of jobs that the TE is allowed to execute in parallel",
    "longdesc":"The \"correct\" value will depend on the speed and load of your network and cluster nodes.",
    "type":"integer",
    "default":"0",
    "source":"pengine",
    "advanced":false,
    "readable_name":"Batch Limit",
    "value":null
  },
  "migration-limit":{
    "name":"migration-limit",
    "shortdesc":"The number of migration jobs that the TE is allowed to execute in parallel on a node",
    "longdesc":"",
    "type":"integer",
    "default":"-1",
    "source":"pengine",
    "advanced":true,
    "readable_name":"migration-limit",
    "value":null
  },
  "default-action-timeout":{
    "name":"default-action-timeout",
    "shortdesc":"Deprecated (use 'timeout' in op_defaults instead)",
    "longdesc":"",
    "type":"time",
    "default":"(null)",
    "source":"pengine",
    "advanced":true,
    "readable_name":"default-action-timeout",
    "value":null
  },
  "stop-all-resources":{
    "name":"stop-all-resources",
    "shortdesc":"Should the cluster stop all active resources (except those needed for fencing)",
    "longdesc":"",
    "type":"boolean",
    "default":"false",
    "source":"pengine",
    "advanced":true,
    "readable_name":"stop-all-resources",
    "value":null
  },
  "stop-orphan-resources":{
    "name":"stop-orphan-resources",
    "shortdesc":"Should deleted resources be stopped",
    "longdesc":"",
    "type":"boolean",
    "default":"true",
    "source":"pengine",
    "advanced":false,
    "readable_name":"Stop Orphan Resources",
    "value":null
  },
  "stop-orphan-actions":{
    "name":"stop-orphan-actions",
    "shortdesc":"Should deleted actions be cancelled",
    "longdesc":"",
    "type":"boolean",
    "default":"true",
    "source":"pengine",
    "advanced":false,
    "readable_name":"Stop Orphan Actions",
    "value":null
  },
  "remove-after-stop":{
    "name":"remove-after-stop",
    "shortdesc":"Remove resources from the LRM after they are stopped",
    "longdesc":"Always set this to false.  Other values are, at best, poorly tested and potentially dangerous.",
    "type":"boolean",
    "default":"false",
    "source":"pengine",
    "advanced":true,
    "readable_name":"remove-after-stop",
    "value":null
  },
  "pe-error-series-max":{
    "name":"pe-error-series-max",
    "shortdesc":"The number of PE inputs resulting in ERRORs to save",
    "longdesc":"Zero to disable, -1 to store unlimited.",
    "type":"integer",
    "default":"-1",
    "source":"pengine",
    "advanced":false,
    "readable_name":"PE Error Storage",
    "value":null
  },
  "pe-warn-series-max":{
    "name":"pe-warn-series-max",
    "shortdesc":"The number of PE inputs resulting in WARNINGs to save",
    "longdesc":"Zero to disable, -1 to store unlimited.",
    "type":"integer",
    "default":"5000",
    "source":"pengine",
    "advanced":false,
    "readable_name":"PE Warning Storage",
    "value":null
  },
  "pe-input-series-max":{
    "name":"pe-input-series-max",
    "shortdesc":"The number of other PE inputs to save",
    "longdesc":"Zero to disable, -1 to store unlimited.",
    "type":"integer",
    "default":"4000",
    "source":"pengine",
    "advanced":false,
    "readable_name":"PE Input Storage",
    "value":null
  },
  "node-health-strategy":{
    "name":"node-health-strategy",
    "shortdesc":"The strategy combining node attributes to determine overall node health.",
    "longdesc":"Requires external entities to create node attributes (named with the prefix '#health') with values: 'red', 'yellow' or 'green'.",
    "type":"enum",
    "default":"none",
    "enum":["none",
      "migrate-on-red",
      "only-green",
      "progressive",
      "custom"],
      "source":"pengine",
      "advanced":true,
      "readable_name":"node-health-strategy",
      "value":null
  },
  "node-health-base":{
    "name":"node-health-base",
    "shortdesc":"The base score assigned to a node",
    "longdesc":"Only used when node-health-strategy is set to progressive.",
    "type":"integer",
    "default":"0",
    "source":"pengine",
    "advanced":true,
    "readable_name":"node-health-base",
    "value":null
  },
  "node-health-green":{
    "name":"node-health-green",
    "shortdesc":"The score 'green' translates to in rsc_location constraints",
    "longdesc":"Only used when node-health-strategy is set to custom or progressive.",
    "type":"integer",
    "default":"0",
    "source":"pengine",
    "advanced":true,
    "readable_name":"node-health-green",
    "value":null
  },
  "node-health-yellow":{
    "name":"node-health-yellow",
    "shortdesc":"The score 'yellow' translates to in rsc_location constraints",
    "longdesc":"Only used when node-health-strategy is set to custom or progressive.",
    "type":"integer",
    "default":"0",
    "source":"pengine",
    "advanced":true,
    "readable_name":"node-health-yellow",
    "value":null
  },
  "node-health-red":{
    "name":"node-health-red",
    "shortdesc":"The score 'red' translates to in rsc_location constraints",
    "longdesc":"Only used when node-health-strategy is set to custom or progressive.",
    "type":"integer",
    "default":"-INFINITY",
    "source":"pengine",
    "advanced":true,
    "readable_name":"node-health-red",
    "value":null
  },
  "placement-strategy":{
    "name":"placement-strategy",
    "shortdesc":"The strategy to determine resource placement",
    "longdesc":"",
    "type":"enum",
    "default":"default",
    "enum":[
      "default",
      "utilization",
      "minimal",
      "balanced"
    ],
    "source":"pengine",
    "advanced":true,
    "readable_name":"placement-strategy",
    "value":null
  },
  "dc-deadtime":{
    "name":"dc-deadtime",
    "shortdesc":"How long to wait for a response from other nodes during startup.",
    "longdesc":"The \"correct\" value will depend on the speed/load of your network and the type of switches used.",
    "type":"time",
    "default":"20s",
    "source":"crmd",
    "advanced":true,
    "readable_name":"dc-deadtime",
    "value":null
  },
  "cluster-recheck-interval":{
    "name":"cluster-recheck-interval",
    "shortdesc":"Polling interval for time based changes to options, resource parameters and constraints.",
    "longdesc":"The Cluster is primarily event driven, however the configuration can have elements that change based on time.  To ensure these changes take effect, we can optionally poll the cluster's status for changes.  Allowed values: Zero disables polling.  Positive values are an interval in seconds (unless other SI units are specified. eg. 5min)",
    "type":"time",
    "default":"15min",
    "source":"crmd",
    "advanced":true,
    "readable_name":"cluster-recheck-interval",
    "value":null
  },
  "load-threshold":{
    "name":"load-threshold",
    "shortdesc":"The maximum amount of system resources that should be used by nodes in the cluster",
    "longdesc":"The cluster will slow down its recovery process when the amount of system resources used (currently CPU) approaches this limit",
    "type":"percentage",
    "default":"80%",
    "source":"crmd",
    "advanced":true,
    "readable_name":"load-threshold",
    "value":null
  },
  "node-action-limit":{
    "name":"node-action-limit",
    "shortdesc":"The maximum number of jobs that can be scheduled per node. Defaults to 2x cores",
    "longdesc":"",
    "type":"integer",
    "default":"0",
    "source":"crmd",
    "advanced":true,
    "readable_name":"node-action-limit",
    "value":null
  },
  "election-timeout":{
    "name":"election-timeout",
    "shortdesc":"*** Advanced Use Only ***.",
    "longdesc":"If need to adjust this value, it probably indicates the presence of a bug.",
    "type":"time",
    "default":"2min",
    "source":"crmd",
    "advanced":true,
    "readable_name":"election-timeout",
    "value":null
  },
  "shutdown-escalation":{
    "name":"shutdown-escalation",
    "shortdesc":"*** Advanced Use Only ***.",
    "longdesc":"If need to adjust this value, it probably indicates the presence of a bug.",
    "type":"time",
    "default":"20min",
    "source":"crmd",
    "advanced":true,
    "readable_name":"shutdown-escalation",
    "value":null
  },
  "crmd-integration-timeout":{
    "name":"crmd-integration-timeout",
    "shortdesc":"*** Advanced Use Only ***.",
    "longdesc":"If need to adjust this value, it probably indicates the presence of a bug.",
    "type":"time",
    "default":"3min",
    "source":"crmd",
    "advanced":true,
    "readable_name":"crmd-integration-timeout",
    "value":null
  },
  "crmd-finalization-timeout":{
    "name":"crmd-finalization-timeout",
    "shortdesc":"*** Advanced Use Only ***.",
    "longdesc":"If you need to adjust this value, it probably indicates the presence of a bug.",
    "type":"time",
    "default":"30min",
    "source":"crmd",
    "advanced":true,
    "readable_name":"crmd-finalization-timeout",
    "value":null
  },
  "crmd-transition-delay":{
    "name":"crmd-transition-delay",
    "shortdesc":"*** Advanced Use Only ***\nEnabling this option will slow down cluster recovery under all conditions",
    "longdesc":"Delay cluster recovery for the configured interval to allow for additional/related events to occur.\nUseful if your configuration is sensitive to the order in which ping updates arrive.",
    "type":"time",
    "default":"0s",
    "source":"crmd",
    "advanced":true,
    "readable_name":"crmd-transition-delay",
    "value":null
  },
  "stonith-watchdog-timeout":{
    "name":"stonith-watchdog-timeout",
    "shortdesc":"How long to wait before we can assume nodes are safely down",
    "longdesc":"",
    "type":"time",
    "default":"(null)",
    "source":"crmd",
    "advanced":true,
    "readable_name":"stonith-watchdog-timeout",
    "value":null
  },
  "stonith-max-attempts":{
    "name":"stonith-max-attempts",
    "shortdesc":"How many times stonith can fail before it will no longer be attempted on a target",
    "longdesc":"",
    "type":"integer",
    "default":"10",
    "source":"crmd",
    "advanced":true,
    "readable_name":"stonith-max-attempts",
    "value":null
  },
  "enable-acl":{
    "name":"enable-acl",
    "shortdesc":"Enable CIB ACL",
    "longdesc":"",
    "type":"boolean",
    "default":"false",
    "source":"cib",
    "advanced":false,
    "readable_name":"Enable ACLs",
    "value":null
  },
  "cluster-ipc-limit":{
    "name":"cluster-ipc-limit",
    "shortdesc":"Maximum IPC message backlog before disconnecting a cluster daemon",
    "longdesc":"Raise this if log has \"Evicting client\" messages for cluster daemon PIDs (a good value is the number of resources in the cluster multiplied by the number of nodes)",
    "type":"integer",
    "default":"500",
    "source":"cib",
    "advanced":true,
    "readable_name":"cluster-ipc-limit",
    "value":null
  }
})

let defaultState = {
  request: {
    delay: 800,
  },
  login: {
    logged: true,
    ajaxId: "1533967169-76",
    noauthorized: '{"notauthorized":"true"}',
    username: "hacluster",
    password: "hh",
  },
  dashboard: {
    cluster_list: [
      {
        cluster_name: "first",
      },
      {
        cluster_name: "second",
      },
      {
        cluster_name: "third",
      },
    ]
  },
  status_map: {
    "first": clusterStatus("first"),
    "second": clusterStatus("second"),
    "third": clusterStatus("third"),
  },
  properties_map: {
    "first": clusterProperties(),
    "second": clusterProperties(),
    "third": clusterProperties(),
  },
  nodes_to_add: [
    {name: "cat", port: "2224"},
  ],
}

module.exports = {
  defaultState,
  node,
}