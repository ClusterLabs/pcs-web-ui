import deepmerge from "deepmerge";

import type {ClusterPermissions} from "dev/types";

export const permissions = (
  diff: Partial<ClusterPermissions> = {},
): ClusterPermissions =>
  deepmerge<ClusterPermissions>(
    {
      permission_types: [
        {
          code: "read",
          label: "Read",
          description: "Allows to view cluster settings",
        },
        {
          code: "write",
          label: "Write",
          description:
            "Allows to modify cluster settings except permissions and ACLs",
        },
        {
          code: "grant",
          label: "Grant",
          description: "Allows to modify cluster permissions and ACLs",
        },
        {
          code: "full",
          label: "Full",
          description:
            "Allows unrestricted access to a cluster including adding and" +
            " removing nodes and access to keys and certificates",
        },
      ],
      permissions_dependencies: {
        also_allows: {write: ["read"], full: ["read", "write", "grant"]},
      },
      user_types: [
        {code: "user", label: "User", description: ""},
        {code: "group", label: "Group", description: ""},
      ],
      users_permissions: [
        {type: "group", name: "haclient", allow: ["grant", "read", "write"]},
      ],
    },
    diff || {},
  );
