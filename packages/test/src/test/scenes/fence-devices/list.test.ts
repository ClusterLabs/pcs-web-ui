import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

const {goToCluster} = shortcuts.dashboard;
const {expectKeysAre} = shortcuts.expect;
const {item} = shortcuts.common;
const {textIs} = shortcuts.expect;

const {fenceDevices} = app.clusterDetail;
const {list: fenceDeviceList} = fenceDevices.detail;

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
  await isVisible(fenceDevices.detail);
};

describe("List of fence devices", () => {
  afterEach(intercept.stop);

  it("should be empty when no devices there", async () => {
    interceptWithStonith([]);
    await goToFenceDevices();
    await isAbsent(fenceDeviceList);
    await isVisible(fenceDevices.detail.empty);
  });

  it("should be visible fence devices list", async () => {
    interceptWithStonith([
      cs.stonith(fenceDeviceId_1),
      cs.stonith(fenceDeviceId_2),
    ]);
    await goToFenceDevices();
    await isVisible(fenceDeviceList);
  });

  it("should contain arrived fence devices", async () => {
    interceptWithStonith([
      cs.stonith(fenceDeviceId_1),
      cs.stonith(fenceDeviceId_2),
    ]);
    await goToFenceDevices();
    await expectKeysAre(fenceDeviceList.item.id, [
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
      item(fenceDeviceList.item)
        .byKey(fenceDeviceList.item.id, fenceDeviceId_1)
        .locator(fenceDeviceList.item.id),
    );
    await isVisible(fenceDevices.detail.currentFenceDevice);
    await textIs(fenceDevices.detail.currentFenceDevice.id, fenceDeviceId_1);
  });
});
