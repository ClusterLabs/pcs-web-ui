import { wizardCreateFooterDataTest } from "app/view/share/task/wizardCreateFooterDataTest";

import { dt, mkXPath } from "test/tools/selectors";
import { intercept, location, route, workflow } from "test/tools";

const importButton = dt("import-existing-cluster");

const view = "task-cluster-import";
const inView = (...keys: string[]) => mkXPath(view, ...keys);
type Steps = "Enter node name" | "Check node name";

const nextFrom = <STEP_NAME extends string>() => {
  return async (stepName: STEP_NAME) => {
    await page.click(inView(wizardCreateFooterDataTest(stepName), "task-next"));
  };
};
const task = {
  view: dt(view),
  nodeName: inView("node-name"),
  prepareSuccess: inView("prepare-node-success"),
  prepareAuth: inView("prepare-node-auth"),
  success: inView("task-success"),
  error: inView("task-error"),
  close: inView("task-close"),
  nextFrom: nextFrom<Steps>(),
};

const data = {
  nodeName: "node-1",
  password: "pwd",
  addr: "192.168.0.10",
  port: "1234",
};

const enterNodeName = async () => {
  await page.goto(location.dashboard);
  await page.click(importButton);
  await page.type(task.nodeName, data.nodeName);
  await task.nextFrom("Enter node name");
};

const finishSuccess = async () => {
  await task.nextFrom("Check node name");
  await page.waitForSelector(task.success);
  await page.click(task.close);
  expect(page.url()).toEqual(location.dashboard);
};

describe("Import existng cluster", () => {
  afterEach(intercept.stop);

  it("should import cluster", async () => {
    intercept.run([
      route.importedClusterList(),
      route.check_auth_against_nodes({
        nodeNameList: [data.nodeName],
      }),
      route.existingCluster({ nodeName: data.nodeName }),
    ]);
    await enterNodeName();
    await page.waitForSelector(task.prepareSuccess);
    await finishSuccess();
  });

  it("should import cluster with authentication", async () => {
    intercept.run([
      route.importedClusterList(),
      route.check_auth_against_nodes({
        nodeNameList: [data.nodeName],
        response: { json: { [data.nodeName]: "Unable to authenticate" } },
      }),
      route.auth_gui_against_nodes({
        [data.nodeName]: {
          password: data.password,
          dest_list: [{ addr: data.addr, port: data.port }],
        },
      }),
      route.existingCluster({ nodeName: data.nodeName }),
    ]);
    await enterNodeName();
    await page.waitForSelector(task.prepareAuth);
    await workflow.fillAuthForm(
      data.nodeName,
      task.view,
      data.password,
      data.addr,
      data.port,
    );
    await task.nextFrom("Check node name"); // auth; button is overloaded
    await page.waitForSelector(task.prepareSuccess);
    await finishSuccess();
  });

  it("should display error on backend error", async () => {
    intercept.run([
      route.importedClusterList(),
      route.check_auth_against_nodes({
        nodeNameList: [data.nodeName],
      }),
      route.existingCluster({
        nodeName: data.nodeName,
        response: { status: [400, "Configuration conflict detected."] },
      }),
    ]);
    await enterNodeName();
    await page.waitForSelector(task.prepareSuccess);
    await task.nextFrom("Check node name");
    await page.waitForSelector(task.error);
  });
});
