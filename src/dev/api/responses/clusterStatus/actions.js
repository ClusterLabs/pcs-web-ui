import { cluster, crmStatus, node, resource } from "./tools";

// Purpose is to provide items like resources, nodes, fence devices with
// standard names on which

const actionResource = resourceName =>
  resource(resourceName, {
    crm_status: [
      crmStatus({ resourceId: resourceName, nodeId: "1", nodeName: "ok" }),
    ],
  });

export const actions = cluster("actions", "ok", {
  node_list: [node(1, { name: "ok" }), node(2, { name: "fail" })],
  resource_list: [
    actionResource("ok"),
    actionResource("fail"),
    actionResource("invalid-json"),
    actionResource("missing-key"),
    actionResource("unknown-cmd"),
    actionResource("error"),
  ],
});

const actionResourceAlternative = resourceName =>
  resource(resourceName, {
    meta_attr: [
      {
        id: `${resourceName}-unmanaged`,
        name: "is-managed",
        value: "false",
      },
      {
        id: `${resourceName}-disabled`,
        name: "target-role",
        value: "Stopped",
      },
    ],
    crm_status: [
      crmStatus({ resourceId: resourceName, nodeId: "1", nodeName: "ok" }),
    ],
  });

export const actionsAlternative = cluster("actions", "ok", {
  node_list: [node(1, { name: "ok" }), node(2, { name: "fail" })],
  resource_list: [
    actionResourceAlternative("ok"),
    actionResourceAlternative("fail"),
    actionResourceAlternative("invalid-json"),
    actionResourceAlternative("missing-key"),
    actionResourceAlternative("unknown-cmd"),
    actionResourceAlternative("error"),
  ],
});
