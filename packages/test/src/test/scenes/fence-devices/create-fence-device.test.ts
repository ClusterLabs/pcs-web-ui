import * as responses from "dev/responses";
import * as cs from "dev/responses/clusterStatus/tools";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.dashboard;
const {select} = shortcuts.patternfly;
const {item} = shortcuts.common;
const {expectReview, expectReports} = shortcuts.task;

const {fenceDevicesToolbar} = app.clusterDetail;

const fenceDeviceName = "F1";
const clusterName = "actions";
const agentName = "fence_apc";
const ip = "127.0.0.1";
const username = "user1";

const {createFenceDevice} = app;
const {review} = createFenceDevice;

const openTask = async () => {
  await click(fenceDevicesToolbar.createFenceDevice);
  await isVisible(app.createFenceDevice);
};

const fillInstanceAttr = async (name: string, value: string) => {
  const {attr} = createFenceDevice.instanceAttrs;
  await fill(item(attr).byKey(attr.name, name).locator(attr.value), value);
};

const reviewAttr = (name: string) =>
  item(review.attr).byKey(review.attr.name, name).locator(review.attr.value);

describe("Fence device create task", () => {
  afterEach(intercept.stop);
  beforeEach(async () => {
    await intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
      additionalRouteList: [
        route.stonithAgentDescribeAgent({
          clusterName,
          agentName,
          agentData: responses.fenceAgentMetadata.ok,
        }),
        route.stonithCreate({
          clusterName,
          fenceDeviceName,
          agentName,
          instanceAttrs: {ip, username},
        }),
      ],
    });
  });

  it("should successfully create new fence device", async () => {
    await goToCluster(clusterName, tabs => tabs.fenceDevices);
    await openTask();
    await fill(createFenceDevice.nameType.name, fenceDeviceName);
    await select(createFenceDevice.nameType.agentName, agentName);
    await click(createFenceDevice.nameTypeFooter.next);
    await fillInstanceAttr("ip", ip);
    await fillInstanceAttr("username", username);
    await click(createFenceDevice.instanceAttrsFooter.next);
    await click(createFenceDevice.settingsFooter.next);
    await expectReview([
      [review.name, fenceDeviceName],
      [review.agentName, agentName],
      [reviewAttr("ip"), ip],
      [reviewAttr("username"), username],
    ]);
    await click(createFenceDevice.reviewFooter.next);
    await isVisible(createFenceDevice.success);
    await expectReports(createFenceDevice.report).count(0);
  });
});
