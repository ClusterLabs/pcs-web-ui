import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";
import { Handler, app } from "dev/app";

const refreshCleanup: Handler = (req, res) => {
  const name = req.body.resource.startsWith("FD_")
    ? req.body.resource.slice(3)
    : req.body.resource;

  if (name === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (name === "permission") {
    res.status(403).send("Permission denied");
    return;
  }
  if (name === "error") {
    res.json({
      error: "true",
      stdout: "Standard output",
      stderror: "Standard error",
    });
    return;
  }
  res.json({ success: "true" });
};

app.libCluster("resource-unmanage", (req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.libCluster("resource-manage", (req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.libCluster("resource-disable", (req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.libCluster("resource-enable", (req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.resourceRefresh(refreshCleanup);

app.resourceCleanup(refreshCleanup);

app.removeResource((req, res) => {
  if ("resid-fail" in req.body || "resid-FD_fail" in req.body) {
    res.status(500).send("Something wrong");
    return;
  }
  if ("resid-permission" in req.body || "resid-FD_permission" in req.body) {
    res.status(403).send("Permission denied");
    return;
  }
  if ("resid-error" in req.body || "resid-FD_error" in req.body) {
    res.status(400).send("Unable to stop resource(s).");
    return;
  }
  res.send("");
});

app.resourceClone((req, res) => {
  switch (req.body.resource_id) {
    case "fail":
      res
        .status(400)
        .send(
          "Unable to create clone resource from 'fail': Something wrong happened",
        );
      break;

    case "permission":
      res.status(403).send("Permission denied");
      break;

    default:
      res.send("");
  }
});

app.resourceUnclone((req, res) => {
  switch (req.body.resource_id) {
    case "cloned-fail":
      res
        .status(400)
        .send("Unable to unclone 'fail': Something wrong happened");
      break;

    case "cloned-permission":
      res.status(403).send("Permission denied");
      break;

    default:
      res.send("");
  }
});

app.resourceChangeGroup((req, res) => {
  switch (req.body.resource_id) {
    case "fail":
      res
        .status(400)
        .send(
          `Unable to add resource '${req.body.resource_id}' to `
            + `group '${req.body.group_id}': Something wrong happened`,
        );
      break;

    case "permission":
      res.status(403).send("Permission denied");
      break;

    default:
      res.send("");
  }
});

shortcut.dashboard([
  response.clusterStatus.actions,
  response.clusterStatus.actionsOneGroup,
  response.clusterStatus.actionsNoGroup,
  response.clusterStatus.actionsAlternative,
]);
