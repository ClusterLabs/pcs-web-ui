const {
  resource,
  group,
  clone,
  cluster,
  resourceStatus,
  operation,
} = require("./tools");

const resourceTree = cluster("resourceTree", "ok", {
  resource_list: [
    resource("A", {
      type: "apache",
      status: "disabled",
      crm_status: [
        resourceStatus("A", {
          managed: false,
          target_role: "Stopped",
        }),
      ],
      meta_attr: [{
        id: "A-target-role-stopped",
        name: "target-role",
        value: "Stopped",
      }],
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
    resource("A-failed", {
      type: "apache",
      status: "failed",
      crm_status: [
        resourceStatus("A-failed", {
          failed: true,
          active: false,
        }),
      ],
    }),
    resource("A-op-failed", {
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
    resource("A-blocked", {
      type: "apache",
      status: "blocked",
      crm_status: [
        resourceStatus("A-op-failed", {
          active: false,
        }),
      ],
    }),
    group("GROUP-1", [
      resource("B", {
        status: "disabled",
        meta_attr: [{
          id: "B-target-role-stopped",
          name: "target-role",
          value: "Stopped",
        }],
      }),
      resource("C", {
        status: "disabled",
        meta_attr: [{
          id: "C-target-role-stopped",
          name: "target-role",
          value: "Stopped",
        }],
        crm_status: [
          resourceStatus("C", {
            managed: false,
          }),
        ],
      }),
      resource("C2", {
        crm_status: [
          resourceStatus("C2-ok"),
        ],
      }),
    ]),
    clone(
      "Clone-1",
      group(
        "GROUP-2",
        [
          resource("D", {
            status: "disabled",
            crm_status: [
              resourceStatus("D", {
                managed: false,
                target_role: "Stopped",
              }),
            ],
          }),
          resource("E", { status: "blocked" }),
        ],
        { status: "blocked" },
      ),
      {
        status: "blocked",
        error_list: [
          {
            message: "Failed to monitor Clone-1 on Mon Oct 14 14:00:07 CEST 2019",
          },
        ],
      },
    ),
    clone("Clone-2", resource("F")),
  ],
  constraints: {
    rsc_colocation: [
      {
        id: "colocation-A-G1-INFINITY",
        rsc: "A",
        score: "INFINITY",
        "with-rsc": "GROUP-1",
      },
      {
        id: "colocation-A-G1-INFINITY-2",
        score: "INFINITY",
        sets: [
          {
            id: "rs-colocation-A-G1-INFINITY-2-1",
            resources: ["A", "GROUP-1"],
          },
          {
            id: "rs-colocation-A-G1-INFINITY-2-2",
            resources: ["B", "C"],
          },
        ],
      },
    ],
    rsc_location: [
      {
        id: "cli-prefer-A",
        node: "node-1",
        role: "Started",
        rsc: "A",
        score: "INFINITY",
      },
      {
        id: "G-prefer-node-1",
        node: "node-1",
        "rsc-pattern": "G.*",
        score: "INFINITY",
      },
      {
        id: "cli-prefer-A-1",
        rule_string: "date gt 2019-11-28 and date lt 2019-12-01",
        role: "Started",
        rsc: "A",
        score: "INFINITY",
      },
      {
        id: "cli-prefer-A-2",
        rule_string: "",
        rsc: "A",
        "id-ref": "somewhere else",
      },
    ],
    rsc_order: [
      {
        first: "A",
        "first-action": "start",
        id: "order-A-G1-mandatory",
        then: "GROUP-1",
        "then-action": "start",
      },
      {
        id: "A-then-G1",
        symetrical: true,
        "require-all": true,
        score: "INFINITY",
        first: "A",
        then: "GROUP-1",
      },
      {
        id: "Clone-1-then-A",
        symetrical: false,
        "require-all": false,
        kind: "Mandatory",
        first: "Clone-1",
        then: "A",
      },
      {
        id: "order-A-G1-INFINITY-2",
        score: "INFINITY",
        sets: [
          {
            id: "rs-order-A-G1-INFINITY-2-1",
            resources: ["A", "GROUP-1"],
          },
          {
            id: "rs-order-A-G1-INFINITY-2-2",
            resources: ["B", "C"],
          },
        ],
      },
    ],
    rsc_ticket: [
      {
        id: "A-ticket",
        ticket: "ABC",
        rsc: "A",
        "rsc-role": "Started",
      },
      {
        id: "ticket-A-G1-INFINITY-2",
        ticket: "ABC",
        "loss-policy": "stop",
        sets: [
          {
            id: "rs-ticket-A-G1-INFINITY-2-1",
            resources: ["A", "GROUP-1"],
          },
          {
            id: "rs-ticket-A-G1-INFINITY-2-2",
            resources: ["B", "C"],
          },
        ],
      },
    ],
  },
});

module.exports = { resourceTree };
