import * as response from "dev/responses";
import { Handler, app } from "dev/app";

let isLoggedIn = false;

const jsonOr401 =
  (result: unknown): Handler =>
  (_req, res) => {
    if (isLoggedIn) {
      res.json(result);
    } else {
      res.status(401).send();
    }
  };

app.importedClusterList(
  jsonOr401(
    response.importedClusterList.withClusters([
      response.clusterStatus.ok.cluster_name,
    ]),
  ),
);

app.clusterStatus(jsonOr401(response.clusterStatus.ok));

app.login((req, res) => {
  if (req.body.username === "hacluster" && req.body.password === "hh") {
    isLoggedIn = true;
    res.send("1533967169-76"); // an ajax id, not important for this app
    return;
  }
  if (req.body.username === "user1" && req.body.password === "uu") {
    isLoggedIn = true;
    res.send("1234567890-12"); // an ajax id, not important for this app
    return;
  }
  res.status(401).send(JSON.stringify({ notauthorized: "true" }));
});
