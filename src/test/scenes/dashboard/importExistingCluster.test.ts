import { intercept, location, route } from "test/tools";
import * as workflow from "test/workflow";

const {
  close,
  fillAuthForm,
  nextFrom,
  open,
  fillNodeName,
  waitForCheckNodeSuccess,
  waitForSuccess,
  waitForError,
} = workflow.task.importExistingCluster;

const nodeName = "node-1";
const password = "pwd";
const addr = "192.168.0.10";
const port = "1234";

const openTask = async () => {
  await page.goto(location.dashboard);
  await open();
};

const closeTask = async () => {
  await close();
  expect(page.url()).toEqual(location.dashboard);
};

describe("Import existng cluster", () => {
  afterEach(intercept.stop);

  it("should import cluster", async () => {
    intercept.run([
      route.importedClusterList(),
      route.check_auth_against_nodes({ nodeNameList: [nodeName] }),
      route.existingCluster({ nodeName }),
    ]);
    await openTask();
    await fillNodeName(nodeName);
    await nextFrom("Enter node name");
    await waitForCheckNodeSuccess();
    await nextFrom("Check node name");
    await waitForSuccess();
    await closeTask();
  });

  it("should import cluster with authentication", async () => {
    intercept.run([
      route.importedClusterList(),
      route.check_auth_against_nodes({
        nodeNameList: [nodeName],
        response: { json: { [nodeName]: "Unable to authenticate" } },
      }),
      route.auth_gui_against_nodes({
        [nodeName]: { password, dest_list: [{ addr, port }] },
      }),
      route.existingCluster({ nodeName }),
    ]);
    await openTask();
    await fillNodeName(nodeName);
    await nextFrom("Enter node name");
    await fillAuthForm(nodeName, password, addr, port);
    await nextFrom("Check node name"); // auth; button is overloaded
    await waitForCheckNodeSuccess();
    await nextFrom("Check node name");
    await waitForSuccess();
    await closeTask();
  });

  it("should display error on backend error", async () => {
    intercept.run([
      route.importedClusterList(),
      route.check_auth_against_nodes({ nodeNameList: [nodeName] }),
      route.existingCluster({
        nodeName,
        response: { status: [400, "Configuration conflict detected."] },
      }),
    ]);
    await openTask();
    await fillNodeName(nodeName);
    await nextFrom("Enter node name");
    await waitForCheckNodeSuccess();
    await nextFrom("Check node name");
    await waitForError();
  });
});
