import * as workflow from "test/workflow";
import {intercept, route} from "test/tools";

import {
  clusterStatus,
  interceptWithNodeAttrs,
  node1,
  openNodeAttrsTab,
} from "./common";

const {open, fillForm, run, waitForSuccess, waitForError, close} =
  workflow.task.nvsetListModify({launchKey: "task nvpairs-create"});

describe("Create node attribute task", () => {
  const name = "attribute-name";
  const value = "attribute-value";

  afterEach(intercept.stop);

  it("should create node attribute", async () => {
    interceptWithNodeAttrs([
      route.addNodeAttrRemote({
        clusterName: clusterStatus.cluster_name,
        nodeName: node1.name,
        name,
        value,
      }),
    ]);

    await openNodeAttrsTab();
    await open();
    await fillForm({name, value});
    await run();
    await waitForSuccess();
    await close();
  });

  it("should show error when occure during node attribute create", async () => {
    interceptWithNodeAttrs([
      route.addNodeAttrRemote({
        clusterName: clusterStatus.cluster_name,
        nodeName: node1.name,
        name,
        value,
        response: {
          status: [
            400,
            `Unable to set utilization '${name}=${value}'`
              + ` for node "'${node1.name}': Some stderr...`,
          ],
        },
      }),
    ]);

    await openNodeAttrsTab();
    await open();
    await fillForm({name, value});
    await run();
    await waitForError();
    await close();
  });
});
