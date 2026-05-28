import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {tabs, attributesToolbar} = marks.cluster.resources.currentPrimitive;
const {primitiveAttrsEdit: task} = marks.task;

const resourceId = "A";
const attributes = {
  state: "/run/resource-agents/Dummy-test.state",
  fake: "test-value",
};

const launchTask = async (id: string) => {
  await goToPrimitive(id);
  await click(tabs.attributes);
  await click(attributesToolbar.edit);
};

const fillAttrs = async () => {
  await fill(
    item.byName(task.arg, "state", a => a.value),
    attributes.state,
  );
  await fill(
    item.byName(task.arg, "fake", a => a.value),
    attributes.fake,
  );
};

describe("Edit primitive attrs", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [cs.primitive(resourceId)],
      }),
      additionalRouteList: [
        mock.route.updateResource({
          clusterName,
          resourceId,
          attributes,
        }),
      ],
    });
    await launchTask(resourceId);
    await fillAttrs();

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should deal with backend error", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [cs.primitive(resourceId)],
      }),
      additionalRouteList: [
        mock.route.updateResource({
          clusterName,
          resourceId,
          attributes,
          response: {
            text: JSON.stringify({
              error: "true",
              stdout: "some stdout",
              stderr: "some stderr",
            }),
          },
        }),
      ],
    });
    await launchTask(resourceId);
    await fillAttrs();

    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
