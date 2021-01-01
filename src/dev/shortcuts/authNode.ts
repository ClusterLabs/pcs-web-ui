import * as app from "dev/app";

export const checkAuthAgainstNodes = (
  nodesStates: Record<string, string> = {
    //nodeName: checkValue
    authNonsense: "nonsense",
    authUnable: "Unable to authenticate",
    authOffline: "Offline",
    //authErr: responds 500
    //any other: Online
  },
) =>
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

const containPassword = (
  nodes: Record<string, { password: string }>,
  password: string,
) =>
  Object.keys(nodes).reduce<boolean>(
    (result, name) => result || nodes[name].password === password,
    false,
  );

export const authGuiAgainstNodes = () =>
  app.authGuiAgainstNodes((req, res) => {
    const { nodes } = JSON.parse(req.body.data_json);

    if (containPassword(nodes, "error")) {
      res.status(500).send("SOMETHING WRONG");
      return;
    }

    if (containPassword(nodes, "badformat")) {
      res.json("Bad format");
      return;
    }

    if (containPassword(nodes, "conflict")) {
      res.json({
        plaintext_error:
          "Configuration conflict detected."
          + "\n\nSome nodes had a newer configuration than the local node."
          + " Local node's configuration was updated."
          + " Please repeat the last action if appropriate.",
      });
      return;
    }

    // y: 0 => good password
    // any other: 1 => wrong password
    res.json({
      node_auth_error: Object.keys(nodes).reduce(
        (result, nodeName) => ({
          ...result,
          [nodeName]: nodes[nodeName].password === "y" ? 0 : 1,
        }),
        {},
      ),
    });
  });
