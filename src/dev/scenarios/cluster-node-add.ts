import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";
import * as app from "dev/app";

shortcut.dashboard([
  response.clusterStatus.actions,
  response.clusterStatus.actionsAlternative,
]);

app.canAddClusterOrNodes((_req, res) => {
  res.send("");
});

const nodesStates: Record<string, string> = {
  ok: "Online",
  conflict: "Online",
  "no-auth": "Unable to authenticate",
  nonsense: "nonsense",
};

app.checkAuthAgainstNodes((req, res) => {
  const nodeList: string[] = Array.isArray(req.query.node_list)
    ? (req.query.node_list as string[])
    : [req.query.node_list as string];

  const result = nodeList.reduce<Record<string, string>>(
    (states, node) => ({ ...states, [node]: nodesStates[node] || "Offline" }),
    {},
  );
  res.json(result);
});

app.sendKnownHosts((_req, res) => {
  res.send("success");
});

app.clusterAddNodes((req, res) => {
  shortcut.libStd({
    code: req.body.nodes[0],
    res,
  });
});
