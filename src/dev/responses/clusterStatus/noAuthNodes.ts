import * as t from "./tools";

export const noAuthNodes = t.cluster("noAuthNodes", "error", {
  node_list: [t.node("1"), t.node("2"), t.node("3")],
  warning_list: [
    {
      message: "Not authorized against node(s) node-1 node-2",
      type: "nodes_not_authorized",
      node_list: ["node-1", "node-2"],
    },
    {
      message: "Another issue",
      type: "another_type",
    },
  ],
});
