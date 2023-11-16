import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {goToResources, openClone} from "./common";
import {openPrimitive} from "./commonPrimitive";

const {resourceMove: task} = marks.task;
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

const launchPrimitiveMove = async () => {
  await goToResources();
  await openPrimitive(primitiveId);
  await click([
    marks.cluster.resources.currentPrimitive.toolbar.dropdown,
    marks.cluster.resources.currentPrimitive.toolbar.dropdown.move,
  ]);
  await assert.textIs(
    taskTitle(marks.task.resourceMove),
    "Move primitive resource A",
  );
};

describe("Resource move task", () => {
  afterEach(mock.stop);
  it("should be done with minimal autoclean settings", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.resourceMoveAutoclean({
          clusterName,
          resourceId: primitiveId,
        }),
      ],
    });

    await launchPrimitiveMove();

    await click(task.nodeFooter.reviewAndFinish);
    await assert.textIs([
      [task.review.node, "Not specified\nDefault value"],
      [task.review.constraintHandling, "autoclean"],
      [task.review.strictMode, "no"],
    ]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should complain on inconsisten node", async () => {
    mock.shortcuts.withCluster({clusterStatus});

    await launchPrimitiveMove();
    await click(task.node.useNode);
    await click(task.nodeFooter.reviewAndFinish);

    await isVisible(fieldError(task.node.nodeList));
  });

  it("should be done with maximal autoclean settings", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.resourceMoveAutoclean({
          clusterName,
          resourceId: primitiveId,
          node: node1.name,
          strict: true,
        }),
      ],
    });

    await launchPrimitiveMove();

    await click(task.node.useNode);
    await select(task.node.nodeList, node1.name);
    await click(task.nodeFooter.next);

    await click(task.advanced.strictMode);
    await click(task.advancedFooter.next);

    await assert.textIs([
      [task.review.node, node1.name],
      [task.review.constraintHandling, "autoclean"],
      [task.review.strictMode, "yes"],
    ]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should be done with expire constraint settings", async () => {
    const lifetime = "P2W";
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.resourceMove({
          clusterName,
          resourceId: primitiveId,
          lifetime,
        }),
      ],
    });

    await launchPrimitiveMove();

    await click(task.nodeFooter.next);

    await radioGroup(task.advanced.constraintHandling, "expire");
    await fill(task.advanced.constraintLifetime, lifetime);
    await click(task.advancedFooter.next);

    await assert.textIs([
      [task.review.node, "Not specified\nDefault value"],
      [task.review.constraintHandling, `expire after ${lifetime}`],
    ]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should complain on wrong lifetime", async () => {
    mock.shortcuts.withCluster({clusterStatus});

    await launchPrimitiveMove();

    await click(task.nodeFooter.next);

    await radioGroup(task.advanced.constraintHandling, "expire");
    await fill(task.advanced.constraintLifetime, "wrong");
    await click(task.advancedFooter.next);
    await isVisible(fieldError(task.advanced.constraintLifetime));
  });

  it("should be done with keep constraint and promoted settings", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.resourceMove({
          clusterName,
          resourceId: cloneId,
          master: true,
        }),
      ],
    });

    await goToResources();
    await openClone(cloneId);
    await click([marks.cluster.resources.currentClone.toolbar.move]);
    await assert.textIs(
      taskTitle(marks.task.resourceMove),
      `Move clone ${cloneId}`,
    );

    await click(task.nodeFooter.next);

    await click(task.advanced.promoted);
    await radioGroup(task.advanced.constraintHandling, "keep");
    await click(task.advancedFooter.next);

    await assert.textIs([
      [task.review.node, "Not specified\nDefault value"],
      [task.review.constraintHandling, "keep"],
      [task.review.promoted, "yes"],
    ]);

    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
