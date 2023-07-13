import * as cs from "dev/responses/clusterStatus/tools";

import * as shortcuts from "test/shortcuts";
import {intercept} from "test/tools";

const {goToCluster} = shortcuts.dashboard;
const {expectKeysAre} = shortcuts.expect;
const {fenceDevices} = app.clusterDetail;
const {list} = fenceDevices.detail;

const clusterName = "test-cluster";
const fenceDevice1Id = "F1";
const fenceDevice2Id = "F2";

const interceptWithStonith = (stonithList: ReturnType<typeof cs.stonith>[]) =>
  intercept.shortcuts.interceptWithCluster({
    clusterStatus: cs.cluster(clusterName, "ok", {
      resource_list: stonithList,
    }),
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
    await isAbsent(list);
    await isVisible(fenceDevices.detail.empty);
  });

  it("should contain arrived fence device", async () => {
    interceptWithStonith([
      cs.stonith(fenceDevice1Id),
      cs.stonith(fenceDevice2Id),
    ]);
    await goToFenceDevices();
    await isVisible(list);
    await expectKeysAre(list.item.id, [fenceDevice1Id, fenceDevice2Id]);
  });
});
