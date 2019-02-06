const scenario = process.argv[2] || "default";

let app;

/* eslint-disable no-console, global-require */
if (scenario === "default") {
  ({ app } = require("./scenario-default"));
} else {
  const { run } = require("./scenario-from-tests");
  app = run(scenario);
}
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
