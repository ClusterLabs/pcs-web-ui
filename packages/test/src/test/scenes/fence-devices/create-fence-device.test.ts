import {assert, mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {
  clusterName,
  goToFenceDevices,
  mockWithStonith,
  toolbar,
} from "./common";

const {select} = shortcuts.patternfly;
const {item} = shortcuts.common;

const fenceDeviceName = "F1";
const agentName = "fence_apc";
const ip = "127.0.0.1";
const username = "user1";

const {fenceDeviceCreate} = marks.task;
const {review} = fenceDeviceCreate;

const fillInstanceAttr = async (name: string, value: string) => {
  const {attr} = fenceDeviceCreate.instanceAttrs;
  await fill(item(attr).byKey(attr.name, name).locator(attr.value), value);
};

const reviewAttr = (name: string) =>
  item(review.attr).byKey(review.attr.name, name).locator(review.attr.value);

describe("Fence device create task", () => {
  afterEach(mock.stop);
  beforeEach(async () => {
    await mockWithStonith({
      additionalRouteList: [
        mock.route.stonithCreate({
          clusterName,
          fenceDeviceName,
          agentName,
          instanceAttrs: {ip, username},
        }),
      ],
    });
  });

  it("should successfully create new fence device", async () => {
    await goToFenceDevices();
    await toolbar.launch(toolbar => toolbar.createFenceDevice);
    await fill(fenceDeviceCreate.nameType.name, fenceDeviceName);
    await select(fenceDeviceCreate.nameType.agentName, agentName);
    await click(fenceDeviceCreate.nameTypeFooter.next);
    await fillInstanceAttr("ip", ip);
    await fillInstanceAttr("username", username);
    await click(fenceDeviceCreate.instanceAttrsFooter.next);
    await click(fenceDeviceCreate.settingsFooter.next);
    await assert.inTaskReview([
      [review.name, fenceDeviceName],
      [review.agentName, agentName],
      [reviewAttr("ip"), ip],
      [reviewAttr("username"), username],
    ]);
    await click(fenceDeviceCreate.reviewFooter.next);
    await isVisible(fenceDeviceCreate.success);
    await assert.countIs(fenceDeviceCreate.report, 0);
  });
});
