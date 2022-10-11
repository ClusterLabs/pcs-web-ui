import * as workflow from "test/workflow";
import { intercept, route } from "test/tools";

import {
  clusterStatus,
  doInterception,
  openMetaAttrsTab,
  resourceA,
} from "./common";

const { open, fillForm, run, waitForSuccess, waitForError, close } =
  workflow.task.nvsetListModify({ launchKey: "task nvpairs-create" });

describe("Resource meta attribute create task", () => {
  const name = "attribute-name";
  const value = "100";

  afterEach(intercept.stop);

  it("should create meta attribute", async () => {
    doInterception([
      route.addMetaAttrRemote({
        clusterName: clusterStatus.cluster_name,
        resourceId: resourceA.id,
        name,
        value,
      }),
    ]);

    await openMetaAttrsTab();
    await open();
    await fillForm({ name, value });
    await run();
    await waitForSuccess();
    await close();
  });

  it("should display error when occure during meta attr create", async () => {
    doInterception([
      route.addMetaAttrRemote({
        clusterName: clusterStatus.cluster_name,
        resourceId: resourceA.id,
        name,
        value,
        response: {
          status: [
            400,
            `Unable to set meta attribute '${name}=${value}'`
              + ` for resource "'${resourceA.id}': Some stderr...`,
          ],
        },
      }),
    ]);

    await openMetaAttrsTab();
    await open();
    await fillForm({ name, value });
    await run();
    await waitForError();
    await close();
  });
});
