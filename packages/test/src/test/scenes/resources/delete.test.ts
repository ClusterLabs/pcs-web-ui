import * as cs from "dev/responses/clusterStatus/tools";

import {mock, assert} from "test/tools";
import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {resourceDelete: task} = marks.task;
const {toolbar} = marks.cluster.resources.currentPrimitive;

const resourceId = "A";

const clusterStatus = cs.cluster("test-cluster", "ok", {
  resource_list: [
    cs.primitive(resourceId),
    cs.group("G1", [cs.primitive("G1_A"), cs.primitive("G1_B")]),
    cs.clone("CL1", cs.primitive("CL1_A")),
    cs.clone(
      "CL2",
      cs.group("G2", [cs.primitive("G2_A"), cs.primitive("G2_B")]),
    ),
  ],
});

const runPrimitiveDelete = async () => {
  await click([toolbar.dropdown, toolbar.dropdown.delete]);
};

describe("Resource delete", () => {
  afterEach(mock.stop);

  it("should finish successfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.removeResource({clusterName, resourceId}),
      ],
    });

    await goToPrimitive("A");
    await runPrimitiveDelete();
    await assert.textIs(task, "Deletes the specified resource");
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should display fail", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.removeResource({
          clusterName,
          resourceId,
          response: {
            status: [400, "Unable to stop resource(s)."],
          },
        }),
      ],
    });

    await goToPrimitive("A");
    await runPrimitiveDelete();
    await assert.textIs(task, "Deletes the specified resource");
    await click(task.run);
    await isVisible(task.fail);
    await assert.textIs(task.fail.tryAgain, "Try again");
  });

  it("should allow force", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.removeResource({
          clusterName,
          resourceId,
          response: {
            status: [
              400,
              "Unable to stop resource(s), use --force to override.",
            ],
          },
        }),
      ],
    });

    await goToPrimitive("A");
    await runPrimitiveDelete();
    await assert.textIs(task, "Deletes the specified resource");
    await click(task.run);
    await isVisible(task.fail);
    await assert.textIs(task.fail.tryAgain, "Proceed anyway");
  });
});
