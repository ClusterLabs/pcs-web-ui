import * as t from "io-ts";

import { shape as libShape } from "app/backend/endpoints/lib/shape";
import { endpoint } from "app/backend/endpoints/endpoint";

type NodeName = string;
type SbdTimeoutAction = "reboot" | "off" | "crashdump";
type SbdTimeoutActionFlush = "flush" | "noflush";

export type Commands = [
  {
    name: "resource-group-add";
    payload: {
      group_id: string;
      resource_id_list: string[];
      adjacent_resource_id?: string | null;
      put_after_adjacent?: boolean;
    };
  },
  {
    name: "resource-enable";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-disable";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-unmanage";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-manage";
    payload: {
      resource_or_tag_ids: string[];
    };
  },
  {
    name: "resource-create";
    payload: {
      resource_id: string;
      resource_agent_name: string;
      operation_list: Record<string, string>[];
      meta_attributes: Record<string, string>;
      instance_attributes: Record<string, string>;
      allow_absent_agent?: boolean;
      allow_invalid_operation?: boolean;
      allow_invalid_instance_attributes?: boolean;
      use_default_operations?: boolean;
      ensure_disabled?: boolean;
      allow_not_suitable_command?: boolean;

      wait?: boolean;
    };
  },
  {
    name: "resource-create-in-group";
    payload: {
      resource_id: string;
      resource_agent_name: string;
      group_id: string;
      operation_list: Record<string, string>[];
      meta_attributes: Record<string, string>;
      instance_attributes: Record<string, string>;
      allow_absent_agent?: boolean;
      allow_invalid_operation?: boolean;
      allow_invalid_instance_attributes?: boolean;
      use_default_operations?: boolean;
      ensure_disabled?: boolean;
      adjacent_resource_id?: string;
      put_after_adjacent?: boolean;
      allow_not_suitable_command?: boolean;

      wait?: boolean;
    };
  },
  {
    name: "resource-create-as-clone";
    payload: {
      resource_id: string;
      resource_agent_name: string;
      operation_list: Record<string, string>[];
      meta_attributes: Record<string, string>;
      instance_attributes: Record<string, string>;
      clone_meta_options: Record<string, string>;
      clone_id?: string;
      allow_absent_agent?: boolean;
      allow_invalid_operation?: boolean;
      allow_invalid_instance_attributes?: boolean;
      use_default_operations?: boolean;
      ensure_disabled?: boolean;
      allow_not_suitable_command?: boolean;

      wait?: boolean;
    };
  },
  {
    name: "stonith-create";
    payload: {
      stonith_id: string;
      stonith_agent_name: string;
      operations: Record<string, string>[];
      meta_attributes: Record<string, string>;
      instance_attributes: Record<string, string>;
      allow_absent_agent?: boolean;
      allow_invalid_operation?: boolean;
      allow_invalid_instance_attributes?: boolean;
      use_default_operations?: boolean;
      ensure_disabled?: boolean;

      wait?: boolean;
    };
  },
  {
    name: "stonith-create-in-group";
    payload: {
      stonith_id: string;
      stonith_agent_name: string;
      group_id: string;
      operations: Record<string, string>[];
      meta_attributes: Record<string, string>;
      instance_attributes: Record<string, string>;
      allow_absent_agent?: boolean;
      allow_invalid_operation?: boolean;
      allow_invalid_instance_attributes?: boolean;
      use_default_operations?: boolean;
      ensure_disabled?: boolean;
      adjacent_resource_id?: string;
      put_after_adjacent?: boolean;

      wait?: boolean;
    };
  },
  {
    name: "node-standby-unstandby";
    payload: {
      standby: boolean;
      node_names: string[];
    };
  },
  {
    name: "node-maintenance-unmaintenance";
    payload: {
      maintenance: boolean;
      node_names: string[];
    };
  },
  {
    name: "constraint-order-create-with-set";
    payload: {
      resource_set_list: {
        ids: string[];
        options: {
          sequential?: "true" | "false";
          "require-all"?: "true" | "false";
          action?: "start" | "promote" | "demote" | "stop";
        };
      }[];
      constraint_options: {
        id?: string;
        kind?: "Optional" | "Mandatory" | "Serialize";
        symmetrical?: "true" | "false";
      };
      resource_in_clone_alowed: boolean;
      duplication_alowed: boolean;
    };
  },
  {
    name: "constraint-ticket-create";
    payload: {
      ticket_key: string;
      resource_id: string;
      options: {
        id?: string;
        "rsc-role"?: "Stopped" | "Started" | "Promoted" | "Unpromoted";
        "loss-policy"?: "fence" | "stop" | "freeze" | "demote";
      };
      resource_in_clone_alowed: boolean;
      duplication_alowed: boolean;
    };
  },
  {
    name: "constraint-ticket-create-with-set";
    payload: {
      resource_set_list: {
        ids: string[];
        options: {
          role?: "Stopped" | "Started" | "Promoted" | "Unpromoted";
        };
      }[];
      constraint_options: {
        ticket: string;
        id?: string;
        "loss-policy"?: "fence" | "stop" | "freeze" | "demote";
      };
      resource_in_clone_alowed: boolean;
      duplication_alowed: boolean;
    };
  },
  {
    name: "constraint-colocation-create-with-set";
    payload: {
      resource_set_list: {
        ids: string[];
        options: {
          sequential?: "true" | "false";
          role?: "Stopped" | "Started" | "Promoted" | "Unpromoted";
        };
      }[];
      constraint_options: {
        id?: string;
      } & (
        | { score?: string }
        | { "score-attribute"?: string }
        | { "score-attribute-mangle"?: string }
      );
      resource_in_clone_alowed: boolean;
      duplication_alowed: boolean;
    };
  },
  {
    name: "cluster-add-nodes";
    payload: {
      nodes: {
        name: string;
        addrs?: string[];
        devices?: string[];
        watchdog?: string;
      }[];
      start?: boolean;
      enable?: boolean;
      no_watchdog_validation?: boolean;
      force_flags?: string[];
      wait?: boolean;
    };
  },
  {
    name: "cluster-remove-nodes";
    payload: {
      node_list: string[];
      force_flags?: string[];
    };
  },
  {
    name: "resource-agent-list-agents";
    payload: {
      describe?: boolean;
      search?: string;
    };
  },
  {
    name: "sbd-enable-sbd";
    payload: {
      default_watchdog: string | null;
      watchdog_dict: Record<NodeName, string>;
      sbd_options: {
        // there can be also integer but it can be confusing since 1 means yes
        // rather than 1s
        SBD_DELAY_START?: "yes" | "no";
        SBD_STARTMODE?: "always" | "clean";
        SBD_WATCHDOG_TIMEOUT?: string; // nonnegative integer
        // it would be possible to use:
        // | SbdTimeoutAction
        // | SbdTimeoutActionFlush
        // | `${SbdTimeoutAction},${SbdTimeoutActionFlush}`
        // | `${SbdTimeoutActionFlush},${SbdTimeoutAction}`;
        // but it seems that current version of babel does not support this
        // typescript syntax
        SBD_TIMEOUT_ACTION?:
          | SbdTimeoutAction
          | SbdTimeoutActionFlush
          | "crashdump,flush"
          | "crashdump,noflush"
          | "off,flush"
          | "off,noflush"
          | "reboot,flush"
          | "reboot,noflush"
          | "flush,crashdump"
          | "flush,off"
          | "flush,reboot"
          | "noflush,crashdump"
          | "noflush,off"
          | "noflush,reboot";
      };
      default_device_list?: string[];
      node_device_dict?: Record<NodeName, string[]>;
      allow_unknown_opts?: boolean;
      ignore_offline_nodes?: boolean;
      no_watchdog_validation?: boolean;
      allow_invalid_option_values?: boolean;
    };
  },
  {
    name: "sbd-disable-sbd";
    payload: {
      ignore_offline_nodes?: boolean;
    };
  },
  {
    name: "acl-create-role";
    payload: {
      role_id: string;
      permission_info_list: string[];
      description: string;
    };
  },
  {
    name: "acl-remove-role";
    payload: {
      role_id: string;
      autodelete_users_groups?: boolean;
    };
  },
  {
    name: "acl-assign-role-to-target";
    payload: {
      role_id: string;
      target_id: string;
    };
  },
  {
    name: "acl-assign-role-to-group";
    payload: {
      role_id: string;
      group_id: string;
    };
  },
  {
    name: "acl-unassign-role-from-target";
    payload: {
      role_id: string;
      target_id: string;
      autodelete_target?: boolean;
    };
  },
  {
    name: "acl-unassign-role-from-group";
    payload: {
      role_id: string;
      group_id: string;
      autodelete_group?: boolean;
    };
  },
  {
    name: "acl-add-permission";
    payload: {
      role_id: string;
      permission_info_list: string[];
    };
  },
  {
    name: "acl-remove-permission";
    payload: {
      permission_id: string;
    };
  },
  {
    name: "acl-create-target";
    payload: {
      target_id: string;
      role_list: string[];
    };
  },
  {
    name: "acl-create-group";
    payload: {
      group_id: string;
      role_list: string[];
    };
  },
  {
    name: "acl-remove-target";
    payload: {
      target_id: string;
    };
  },
  {
    name: "acl-remove-group";
    payload: {
      group_id: string;
    };
  },
];

export const libCluster = endpoint({
  url: ({
    clusterName,
    command,
  }: {
    clusterName: string;
    command: Commands[number]["name"];
  }) => `/managec/${clusterName}/api/v1/${command}`,
  method: "post",
  params: undefined,
  payload: undefined,
  validate: undefined,
  shape: libShape(t.null),
});
