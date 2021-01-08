import { api } from "app/backend";

import { app } from "dev/app";
import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";

const { resourceTree } = response.clusterStatus;

let clusterStatusLoadCount = 0;
app.clusterStatus((req, res) => {
  if (req.params.clusterName === resourceTree.cluster_name) {
    if (clusterStatusLoadCount++ > 0) {
      const primitive: api.types.clusterStatus.ApiPrimitive = resourceTree
        .resource_list[0] as api.types.clusterStatus.ApiPrimitive;

      primitive.instance_attr[0] = {
        ...primitive.instance_attr[0],
        value: "/etc/httpd/httpd.conf",
      };
      primitive.instance_attr = primitive.instance_attr.filter(
        (_a: unknown, i: number) => i !== 1,
      );
    }
    res.json(resourceTree);
  } else {
    res.status(404).send("Not found");
  }
});

app.updateResource((req, res) => {
  const httpdAttribute = req.body._res_paramne_httpd;
  let result = {};
  if (httpdAttribute === "fail") {
    res.status(500).send("SOMETHING WRONG");
    return;
  }

  if (httpdAttribute === "invalid") {
    result = "invalid";
  } else if (httpdAttribute === "err") {
    result = {
      error: "true",
      stderr: "Stderr output",
      stdout: "Stdout output",
    };
  }
  res.json(result);
});

shortcut.importedClusterList(
  response.importedClusterList.withClusters([resourceTree.cluster_name]),
);
shortcut.clusterRelated();
