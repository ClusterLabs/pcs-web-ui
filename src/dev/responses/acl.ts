import {Cluster} from "dev/types";

export const firstSet: Cluster["acls"] = {
  role: {
    role1: {
      description: "description1",
      permissions: ["read abc (id)", "deny //xyz (xpath)", "write xyz (id)"],
    },
    empty: {
      description: "",
      permissions: [],
    },
    ok: {
      description: "",
      permissions: [],
    },
    fail: {
      description: "",
      permissions: [],
    },
  },
  group: {
    group1: ["role1"],
    group2: ["role1"],
    empty: [],
    fail: ["role1"],
  },
  user: {
    user1: ["role1", "empty", "ok", "fail"],
    user2: ["role1"],
    empty: [],
    error: [],
    fail: ["role1"],
  },
};
