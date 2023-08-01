import * as responses from "dev/responses";
import * as cs from "dev/responses/clusterStatus/tools";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.dashboard;
const {select} = shortcuts.patternfly;
const {item} = shortcuts.common;
const {expectReview, expectReports} = shortcuts.task;

const {fenceDevicesToolbar} = marks.cluster;

const fenceDeviceName = "F1";
const clusterName = "actions";
const agentName = "fence_apc";
const ip = "127.0.0.1";
const username = "user1";

const {fenceDeviceCreate} = marks.task;
const {review} = fenceDeviceCreate;

const openTask = async () => {
  await click(fenceDevicesToolbar.createFenceDevice);
  await isVisible(fenceDeviceCreate);
};

const fillInstanceAttr = async (name: string, value: string) => {
  const {attr} = fenceDeviceCreate.instanceAttrs;
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
    await fill(fenceDeviceCreate.nameType.name, fenceDeviceName);
    await select(fenceDeviceCreate.nameType.agentName, agentName);
    await click(fenceDeviceCreate.nameTypeFooter.next);
    await fillInstanceAttr("ip", ip);
    await fillInstanceAttr("username", username);
    await click(fenceDeviceCreate.instanceAttrsFooter.next);
    await click(fenceDeviceCreate.settingsFooter.next);
    await expectReview([
      [review.name, fenceDeviceName],
      [review.agentName, agentName],
      [reviewAttr("ip"), ip],
      [reviewAttr("username"), username],
    ]);
    await click(fenceDeviceCreate.reviewFooter.next);
    await isVisible(fenceDeviceCreate.success);
    await expectReports(fenceDeviceCreate.report).count(0);
  });
});
