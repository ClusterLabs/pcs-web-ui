import * as workflow from "test/workflow";
import { intercept, route } from "test/tools";

import {
  clusterStatus,
  interceptWithUtilization,
  node1,
  openUtilizationTab,
} from "./common";

const { open, fillForm, run, waitForSuccess, waitForError, close } =
  workflow.task.nvsetListModify({ launchKey: "create-utilization-attribute" });

describe("Resource utilization task", () => {
  const name = "attribute-name";
  const value = "100";

  afterEach(intercept.stop);

  it("should create utilization", async () => {
    interceptWithUtilization([
      route.setNodeUtilization({
        clusterName: clusterStatus.cluster_name,
        nodeName: node1.name,
        name,
        value,
      }),
    ]);

    await openUtilizationTab();
    await open();
    await fillForm({ name, value });
    await run();
    await waitForSuccess();
    await close();
  });

  it("should display error when occure during utilization create", async () => {
    interceptWithUtilization([
      route.setNodeUtilization({
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

    await openUtilizationTab();
    await open();
    await fillForm({ name, value });
    await run();
    await waitForError();
    await close();
  });
});
