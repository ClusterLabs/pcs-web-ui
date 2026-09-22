import {app} from "dev/app";

app.setNodeUtilization((req, res) => {
  if ("err" === req.body.name) {
    res
      .status(400)
      .send(
        `Unable to set utilization '${req.body.name}=${req.body.value}'` +
          ` for node "'${req.body.node}': Some stderr...`,
      );
    return;
  }
  res.send("");
});

app.setResourceUtilization((req, res) => {
  if ("err" === req.body.name) {
    res
      .status(400)
      .send(
        `Unable to set utilization '${req.body.name}=${req.body.value}'` +
          ` for resource "'${req.body.resource_id}': Some stderr...`,
      );
    return;
  }
  res.send("");
});
