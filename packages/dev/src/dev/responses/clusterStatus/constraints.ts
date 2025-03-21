import type {Cluster} from "dev/types";

export const constraints: Cluster["constraints"] = {
  rsc_colocation: [
    {
      id: "colocation-A-G1-INFINITY",
      rsc: "A",
      score: "INFINITY",
      "with-rsc": "GROUP-1",
    },
    {
      id: "colocation-A-G1-together",
      rsc: "A",
      score: "100",
      "with-rsc": "GROUP-1",
    },
    {
      id: "colocation-A-G1-apart",
      rsc: "A",
      score: "-100",
      "with-rsc": "GROUP-1",
    },
    {
      id: "colocation-A-G1-INFINITY-2",
      score: "INFINITY",
      sets: [
        {
          id: "rs-colocation-A-G1-INFINITY-2-1",
          resources: ["A", "GROUP-1"],
          sequential: "false",
          role: "Master",
        },
        {
          id: "rs-colocation-A-G1-INFINITY-2-2",
          resources: ["B", "C"],
          role: "Slave",
        },
        {
          "id-ref": "reused-rules",
        },
      ],
    },
    {
      id: "colocation-A-G1-INFINITY-3",
      score: "-INFINITY",
      sets: [
        {
          id: "rs-colocation-A-G1-INFINITY-3-1",
          resources: ["A", "GROUP-1"],
          sequential: "false",
          role: "Promoted",
        },
        {
          id: "rs-colocation-A-G1-INFINITY-3-2",
          resources: ["B", "C"],
        },
        {
          "id-ref": "reused-rules",
          role: "Unpromoted",
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
      score: "150",
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
    {
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
      // biome-ignore lint/suspicious/noThenProperty:it is a backend format
      then: "GROUP-1",
      "then-action": "promote",
    },
    {
      id: "A-then-G1",
      symmetrical: "true",
      "require-all": "true",
      score: "INFINITY",
      first: "A",
      // biome-ignore lint/suspicious/noThenProperty:it is a backend format
      then: "GROUP-1",
    },
    {
      id: "Clone-1-then-A",
      symmetrical: "false",
      "require-all": "false",
      kind: "Mandatory",
      first: "Clone-1",
      // biome-ignore lint/suspicious/noThenProperty:it is a backend format
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
      id: "A-ticket2",
      ticket: "ABC",
      rsc: "A",
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
        {
          "id-ref": "some-other-resource-set",
        },
      ],
    },
  ],
};
