import {app} from "dev/app";

app.updateFenceDevice((req, res) => {
  const actionAttribute = req.body._res_paramne_action;
  let result = {};
  if (actionAttribute === "fail") {
    res.status(500).send("SOMETHING WRONG");
    return;
  }

  if (actionAttribute === "invalid") {
    result = "invalid";
  } else if (actionAttribute === "err") {
    result = {
      error: "true",
      stderr: "Stderr output",
      stdout: "Stdout output",
    };
  }
  res.json(result);
});
