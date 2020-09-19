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
