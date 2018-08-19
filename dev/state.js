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
    node(1, "ant"),
    node(2, "bee"),
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


module.exports = {
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
  }
}
