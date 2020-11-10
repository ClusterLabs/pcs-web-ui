import * as response from "dev/responses";
import * as shortcut from "dev/shortcuts";
import * as app from "dev/app";

const refreshCleanup: app.Handler = (req, res) => {
  if (req.body.resource === "fail") {
    res.status(500).send("Something wrong");
    return;
  }
  if (req.body.resource === "permission") {
    res.status(403).send("Permission denied");
    return;
  }
  if (req.body.resource === "error") {
    res.json({
      error: "true",
      stdout: "Standard output",
      stderror: "Standard error",
    });
    return;
  }
  res.json({ success: "true" });
};

app.resourceUnmanage((req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.resourceManage((req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.resourceDisable((req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.resourceEnable((req, res) =>
  shortcut.libStd({ code: req.body.resource_or_tag_ids[0], res }),
);

app.resourceRefresh(refreshCleanup);

app.resourceCleanup(refreshCleanup);

app.removeResource((req, res) => {
  if ("resid-fail" in req.body) {
    res.status(500).send("Something wrong");
    return;
  }
  if ("resid-permission" in req.body) {
    res.status(403).send("Permission denied");
    return;
  }
  if ("resid-error" in req.body) {
    res.status(400).send("Unable to stop resource(s).");
    return;
  }
  res.send("");
});

shortcut.dashboard([
  response.clusterStatus.actions,
  response.clusterStatus.actionsAlternative,
]);
