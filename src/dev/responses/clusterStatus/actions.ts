import {
  clone,
  cluster,
  crmStatus,
  group,
  node,
  primitive,
  services,
  stonith,
} from "./tools";
import { constraints } from "./constraints";

// Purpose is to provide items like resources, nodes, fence devices with
// standard names on which

const actionResource = (resourceName: string) =>
  primitive(resourceName, {
    crm_status: [
      crmStatus({ resourceId: resourceName, nodeId: "1", nodeName: "ok" }),
    ],
  });

const buildNodeList = (
  nodeNameList: string[],
  { sbdEnabled }: { sbdEnabled: boolean } = { sbdEnabled: true },
) => {
  let i = 1;
  return nodeNameList.map(name =>
    node(`${i++}`, {
      name,
      services: services({
        sbd: { installed: true, running: true, enabled: sbdEnabled },
      }),
    }),
  );
};

const nodeNames = [
  "ok",
  "fail",
  "permission",
  "invalid-json",
  "missing-key",
  "unknown-cmd",
  "error",
];

export const actions = cluster("actions", "ok", {
  node_list: buildNodeList(nodeNames),
  resource_list: [
    actionResource("ok"),
    actionResource("fail"),
    actionResource("permission"),
    actionResource("invalid-json"),
    actionResource("missing-key"),
    actionResource("unknown-cmd"),
    actionResource("error"),
    group("GROUP-1", [primitive("groupped-ok"), primitive("groupped-fail")]),
    clone("Clone-1", primitive("cloned-ok")),
    clone("Clone-2", primitive("cloned-fail")),
    clone("Clone-3", primitive("cloned-permission")),
    clone(
      "Clone-4",
      group("GROUP-2", [
        primitive("groupped2-ok"),
        primitive("groupped2-fail"),
      ]),
    ),
    stonith("FD_ok"),
    stonith("FD_fail"),
    stonith("FD_permission"),
    stonith("FD_invalid-json"),
    stonith("FD_missing-key"),
    stonith("FD_unknown-cmd"),
    stonith("FD_error"),
  ],
  constraints,
});

const actionResourceAlternative = (resourceName: string) =>
  primitive(resourceName, {
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

export const actionsAlternative = cluster("actions-alt", "ok", {
  node_list: buildNodeList(nodeNames, { sbdEnabled: false }),
  node_attr: nodeNames.reduce(
    (attrs, nodeName) => ({
      ...attrs,
      [nodeName]: [
        { id: `${nodeName}-standby`, name: "standby", value: "on" },
        { id: `${nodeName}-maintenance`, name: "maintenance", value: "on" },
      ],
    }),
    {},
  ),

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
