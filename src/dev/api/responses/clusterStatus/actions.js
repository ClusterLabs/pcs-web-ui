import { cluster, crmStatus, node, resource } from "./tools";

// Purpose is to provide items like resources, nodes, fence devices with
// standard names on which

const actionResource = resourceName =>
  resource(resourceName, {
    crm_status: [
      crmStatus({ resourceId: resourceName, nodeId: "1", nodeName: "ok" }),
    ],
  });

const nodeList = (nodeNameList) => {
  let i = 1;
  return nodeNameList.map(name => node(i++, { name }));
};

export const actions = cluster("actions", "ok", {
  node_list: nodeList([
    "ok",
    "fail",
    "permission",
    "invalid-json",
    "missing-key",
    "unknown-cmd",
    "error",
  ]),
  resource_list: [
    actionResource("ok"),
    actionResource("fail"),
    actionResource("permission"),
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
    actionResourceAlternative("permission"),
    actionResourceAlternative("invalid-json"),
    actionResourceAlternative("missing-key"),
    actionResourceAlternative("unknown-cmd"),
    actionResourceAlternative("error"),
  ],
});
