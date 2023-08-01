import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

const {goToCluster} = shortcuts.dashboard;
const {expectKeysAre} = shortcuts.expect;
const {item} = shortcuts.common;
const {textIs} = shortcuts.expect;

const {fenceDevices} = marks.cluster;

const clusterName = "test-cluster";
const fenceDeviceId_1 = "F1";
const fenceDeviceId_2 = "F2";

const interceptWithStonith = (stonithList: ReturnType<typeof cs.stonith>[]) =>
  intercept.shortcuts.interceptWithCluster({
    clusterStatus: cs.cluster(clusterName, "ok", {
      resource_list: stonithList,
    }),
    optionalRoutes: ["agentFenceApc"],
  });

const goToFenceDevices = async () => {
  await goToCluster(clusterName, tabs => tabs.fenceDevices);
  await isVisible(fenceDevices);
};

describe("List of fence devices", () => {
  afterEach(intercept.stop);

  it("should be empty when no devices there", async () => {
    interceptWithStonith([]);
    await goToFenceDevices();
    await isAbsent(fenceDevices.list);
    await isVisible(fenceDevices.empty);
  });

  it("should be visible fence devices list", async () => {
    interceptWithStonith([
      cs.stonith(fenceDeviceId_1),
      cs.stonith(fenceDeviceId_2),
    ]);
    await goToFenceDevices();
    await isVisible(fenceDevices.list);
  });

  it("should contain arrived fence devices", async () => {
    interceptWithStonith([
      cs.stonith(fenceDeviceId_1),
      cs.stonith(fenceDeviceId_2),
    ]);
    await goToFenceDevices();
    await expectKeysAre(fenceDevices.list.item.id, [
      fenceDeviceId_1,
      fenceDeviceId_2,
    ]);
  });

  it("should be able open detail from list", async () => {
    interceptWithStonith([
      cs.stonith(fenceDeviceId_1),
      cs.stonith(fenceDeviceId_2),
    ]);
    await goToFenceDevices();
    await click(
      item(fenceDevices.list.item)
        .byKey(fenceDevices.list.item.id, fenceDeviceId_1)
        .locator(fenceDevices.list.item.id),
    );
    await isVisible(fenceDevices.currentFenceDevice);
    await textIs(fenceDevices.currentFenceDevice.id, fenceDeviceId_1);
  });
});
