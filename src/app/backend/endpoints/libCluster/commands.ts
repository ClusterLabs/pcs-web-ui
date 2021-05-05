export type LibClusterCommands = [
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
      ensure_disabled: boolean;
      allow_not_suitable_command?: boolean;

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
    name: "constraint-ticket-create-with-set";
    payload: {
      resource_set_list: {
        ids: string[];
        role?: "Stopped" | "Started" | "Master" | "Slave";
      }[];
      constraint_options: {
        id?: string;
        "loss-policy"?: "fence" | "stop" | "freeze" | "demote";
      };
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
];
