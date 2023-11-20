import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {goToResources, openClone} from "./common";
import {openPrimitive} from "./commonPrimitive";

const {resourceClear: task} = marks.task;
const clusterName = "test-cluster";
const primitiveId = "A";
const cloneId = "CL1";
const node1 = cs.node("1");
const clusterStatus = cs.cluster(clusterName, "ok", {
  node_list: [node1, cs.node("2")],
  resource_list: [
    cs.primitive(primitiveId),
    cs.clone("CL1", cs.primitive("CL1_A"), {promotable: true}),
  ],
});

const launchPrimitiveClear = async () => {
  await goToResources();
  await openPrimitive(primitiveId);
  await click([
    marks.cluster.resources.currentPrimitive.toolbar.dropdown,
    marks.cluster.resources.currentPrimitive.toolbar.dropdown.clear,
  ]);
  await assert.textIs(
    taskTitle(marks.task.resourceClear),
    "Clear primitive resource A",
  );
};

describe("Resource clear task", () => {
  afterEach(mock.stop);
  it("should be done with minimal settings", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.resourceClear({
          clusterName,
          resourceId: primitiveId,
        }),
      ],
    });

    await launchPrimitiveClear();

    await click(task.nodeFooter.reviewAndFinish);
    await assert.textIs([[task.review.node, "Not specified\nDefault value"]]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should complain on inconsisten node", async () => {
    mock.shortcuts.withCluster({clusterStatus});

    await launchPrimitiveClear();
    await click(task.node.useNode);
    await click(task.nodeFooter.reviewAndFinish);

    await isVisible(fieldError(task.node.nodeList));
  });

  it("should be done with maximal settings", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.resourceClear({
          clusterName,
          resourceId: primitiveId,
          node: node1.name,
          expired: true,
        }),
      ],
    });

    await launchPrimitiveClear();

    await click(task.node.useNode);
    await select(task.node.nodeList, node1.name);
    await click(task.nodeFooter.next);

    await click(task.advanced.expiredOnly);
    await click(task.advancedFooter.next);

    await assert.textIs([[task.review.node, node1.name]]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should be done with promoted settings", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.resourceClear({
          clusterName,
          resourceId: cloneId,
          master: true,
        }),
      ],
    });

    await goToResources();
    await openClone(cloneId);
    await click([
      marks.cluster.resources.currentClone.toolbar.dropdown,
      marks.cluster.resources.currentClone.toolbar.dropdown.clear,
    ]);
    await assert.textIs(
      taskTitle(marks.task.resourceClear),
      `Clear clone ${cloneId}`,
    );

    await click(task.nodeFooter.next);

    await click(task.advanced.promoted);
    await click(task.advancedFooter.next);

    await assert.textIs([
      [task.review.node, "Not specified\nDefault value"],
      [task.review.promoted, "yes"],
    ]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
