import {assert, mock} from "test/tools";

import {clusterName, goToFenceDevices, mockWithStonith} from "./common";

const fenceDeviceName = "F1";
const agentName = "fence_apc";
const ip = "127.0.0.1";
const username = "user1";

const {fenceDeviceCreate: task} = marks.task;
const {review} = task;

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
    await click(marks.cluster.fenceDevicesToolbar.createFenceDevice);
    await fill(task.nameType.name, fenceDeviceName);
    await select(task.nameType.agentName, agentName);
    await click(task.nameTypeFooter.next);
    await fill(
      item.byName(task.instanceAttrs.attr, "ip", a => a.value),
      ip,
    );
    await fill(
      item.byName(task.instanceAttrs.attr, "username", a => a.value),
      username,
    );
    await click(task.instanceAttrsFooter.next);
    await click(task.settingsFooter.next);
    await assert.textIs([
      [review.name, fenceDeviceName],
      [review.agentName, agentName],
      [item.byName(review.attr, "ip", a => a.value), ip],
      [item.byName(review.attr, "username", a => a.value), username],
    ]);
    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await assert.countIs(task.report, 0);
  });
});
