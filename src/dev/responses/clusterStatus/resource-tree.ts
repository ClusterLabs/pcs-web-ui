import { Cluster } from "dev/types";

import {
  clone,
  cluster,
  group,
  node,
  operation,
  primitive,
  resourceStatus,
  stonith,
} from "./tools";
import { constraints } from "./constraints";

export const resourceTree: Cluster = cluster("resourceTree", "ok", {
  node_list: [
    node("1", {
      services: {
        pacemaker: {
          installed: true,
          running: false,
          enabled: true,
        },
        pacemaker_remote: {
          installed: false,
          running: false,
          enabled: false,
        },
        corosync: {
          installed: true,
          running: true,
          enabled: true,
        },
        pcsd: {
          installed: true,
          running: true,
          enabled: false,
        },
        sbd: {
          installed: false,
          running: false,
          enabled: false,
        },
      },
    }),
    node("2", {
      error_list: [
        {
          message: "Test error",
        },
      ],
      warning_list: [
        {
          message: "Test warning 1",
        },
        {
          message: "Test warning 2",
        },
      ],
    }),
  ],
  nodes_utilization: {
    "node-1": [
      {
        id: "Node-1-utilization-cpu-2",
        name: "cpu",
        value: "2",
      },
      {
        id: "Node-1-utilization-memory-4096",
        name: "memory",
        value: "4096",
      },
    ],
  },
  resource_list: [
    primitive("A", {
      type: "apache",
      status: "disabled",
      crm_status: [
        resourceStatus("A", {
          resource_agent: "ocf:heartbeat:apache",
          managed: true,
          target_role: "Started",
          role: "Started",
          node: {
            id: "1",
            name: "node-1",
            cached: false,
          },
        }),
        resourceStatus("A", {
          resource_agent: "ocf:heartbeat:apache",
          managed: true,
          role: "Master",
          node: {
            id: "2",
            name: "node-2",
            cached: false,
          },
        }),
      ],
      meta_attr: [
        {
          id: "A-target-role-stopped",
          name: "target-role",
          value: "Stopped",
        },
      ],
      utilization: [
        {
          id: "A-utilization-cpu-2",
          name: "cpu",
          value: "2",
        },
        {
          id: "A-utilization-memory-4096",
          name: "memory",
          value: "4096",
        },
      ],
      error_list: [
        {
          message: "Failed to monitor A on Mon Oct 14 14:00:07 CEST 2019",
        },
      ],
      instance_attr: [
        {
          id: "A-instance_attributes-configfile",
          name: "configfile",
          value: "/etc/apache/httpd.conf",
        },
        {
          id: "A-instance_attributes-httpd",
          name: "httpd",
          value: "/usr/sbin/httpd",
        },
      ],
    }),
    primitive("A-failed", {
      type: "apache",
      status: "failed",
      crm_status: [
        resourceStatus("A-failed", {
          failed: true,
          active: false,
        }),
      ],
    }),
    primitive("A-op-failed", {
      type: "apache",
      status: "failed",
      crm_status: [
        resourceStatus("A-op-failed", {
          active: false,
        }),
      ],
      operations: [
        operation("A-op-failed-operation", {
          rc_code: 1,
        }),
      ],
    }),
    primitive("A-blocked", {
      type: "apache",
      status: "blocked",
      crm_status: [
        resourceStatus("A-op-failed", {
          active: false,
        }),
      ],
    }),
    group(
      "GROUP-1",
      [
        primitive("B", {
          status: "disabled",
          meta_attr: [
            {
              id: "B-target-role-stopped",
              name: "target-role",
              value: "Stopped",
            },
          ],
          crm_status: [
            resourceStatus("B", {
              resource_agent: "ocf:heartbeat:Dummy",
              managed: true,
              target_role: "",
              role: "Started",
              node: {
                id: "1",
                name: "node-1",
                cached: false,
              },
            }),
            resourceStatus("B", {
              resource_agent: "ocf:heartbeat:Dummy",
              managed: true,
              target_role: "",
              role: "Stopped",
              node: {
                id: "2",
                name: "node-2",
                cached: false,
              },
            }),
          ],
          operations: [
            operation("B-op-failed-operation", {
              rc_code: 1,
            }),
          ],
        }),
        primitive("C", {
          status: "disabled",
          meta_attr: [
            {
              id: "C-target-role-stopped",
              name: "target-role",
              value: "Stopped",
            },
          ],
          crm_status: [
            resourceStatus("C", {
              managed: false,
            }),
          ],
        }),
        primitive("C2", {
          crm_status: [resourceStatus("C2-ok")],
        }),
      ],
      {
        meta_attr: [
          {
            id: "GROUP-1-target-role-stopped",
            name: "target-role",
            value: "Stopped",
          },
        ],
      },
    ),
    group("GROUP-MIXED", [
      primitive("MixedResource", {
        crm_status: [resourceStatus("MR-ok")],
      }),
      stonith("MixedStonith"),
    ]),
    clone(
      "Clone-1",
      group(
        "GROUP-2",
        [
          primitive("D", {
            status: "disabled",
            crm_status: [
              resourceStatus("D", {
                managed: false,
                target_role: "Stopped",
              }),
            ],
          }),
          primitive("E", { status: "blocked" }),
        ],
        { status: "blocked" },
      ),
      {
        status: "blocked",
        error_list: [
          {
            message:
              "Failed to monitor Clone-1 on Mon Oct 14 14:00:07 CEST 2019",
          },
        ],
      },
    ),
    clone("Clone-2", primitive("F")),
    clone("Clone-Mixed", stonith("MixedClonedStonith")),
    clone("Clone-Mixed-group", group("GROUP-MIXED-CLONED", [
      primitive("MixedResource-2", {
        crm_status: [resourceStatus("MR-ok-2")],
      }),
      stonith("MixedStonith-2"),
    ])),
    stonith("F1", {
      error_list: [
        {
          message: "Example fail of fence agent",
        },
      ],
      instance_attr: [
        {
          id: "cmd_prompt-ia",
          name: "cmd_prompt",
          value: "['\n->', '\napc->']",
        },
      ],
    }),
  ],
  constraints,
  pacemaker_standby: ["node-1"],
  node_attr: {
    "node-1": [
      {
        id: "node-1-attr",
        name: "maintenance",
        value: "yes",
      },
    ],
  },
});
