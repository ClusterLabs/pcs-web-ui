import * as shortcuts from "test/shortcuts";
import {mock} from "test/tools";

import {goToFenceDevices, mockWithStonith, openFenceDevice} from "./common";

const {expectKeysAre} = shortcuts.expect;
const {textIs} = shortcuts.expect;

const {fenceDevices} = marks.cluster;

const fdId_1 = "F1";
const fdId_2 = "F2";

describe("List of fence devices", () => {
  afterEach(mock.stop);

  it("should be empty when no devices there", async () => {
    mockWithStonith();
    await goToFenceDevices();
    await isAbsent(fenceDevices.list);
    await isVisible(fenceDevices.empty);
  });

  it("should be visible fence devices list", async () => {
    mockWithStonith({fenceDeviceIdList: [fdId_1, fdId_2]});
    await goToFenceDevices();
    await isVisible(fenceDevices.list);
  });

  it("should contain arrived fence devices", async () => {
    mockWithStonith({fenceDeviceIdList: [fdId_1, fdId_2]});
    await goToFenceDevices();
    await expectKeysAre(fenceDevices.list.item.id, [fdId_1, fdId_2]);
  });

  it("should be able open detail from list", async () => {
    mockWithStonith({fenceDeviceIdList: [fdId_1, fdId_2]});
    await goToFenceDevices();
    await openFenceDevice(fdId_1);
    await isVisible(fenceDevices.currentFenceDevice);
    await textIs(fenceDevices.currentFenceDevice.id, fdId_1);
  });
});
