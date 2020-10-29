import * as shortcut from "dev/shortcuts";
import * as response from "dev/responses";
import * as app from "dev/app";

shortcut.dashboard([
  response.clusterStatus.actions,
  response.clusterStatus.actionsAlternative,
]);

app.canAddClusterOrNodes((req, res) => {
  if (!("node_names" in req.query)) {
    res
      .status(500)
      .send("Wrong request - missing node_names[] - it's a programming error!");
  }
  const nodeName: string = (req.query.node_names as string[])[0] as string;
  if (nodeName === "canNo") {
    res
      .status(400)
      .send(
        `The node '${nodeName}' is already a part of the 'ClusterName' cluster.`
          + " You may not add a node to two different clusters.",
      );
    return;
  }
  if (nodeName === "canErr") {
    res.status(500).send("Error during checking if can add node to cluster");
    return;
  }
  res.send("");
});

const nodesStates: Record<string, string> = {
  authNonsense: "nonsense",
  authUnable: "Unable to authenticate",
  authOffline: "Offline",
};

app.checkAuthAgainstNodes((req, res) => {
  const nodeList: string[] = Array.isArray(req.query.node_list)
    ? (req.query.node_list as string[])
    : [req.query.node_list as string];

  if (nodeList[0] === "authErr") {
    res.status(500).send("Error during checking authentization");
    return;
  }

  const result = nodeList.reduce<Record<string, string>>(
    (states, node) => ({ ...states, [node]: nodesStates[node] || "Online" }),
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
