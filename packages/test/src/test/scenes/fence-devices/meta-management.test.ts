import {mock} from "test/tools";

import {clusterName, goToFenceDevice, mockWithStonith} from "./common";

const {tabs, meta} = marks.cluster.fenceDevices.currentFenceDevice;
const {nvsetEdit: task} = marks.task;

const fenceDeviceId = "F1";
const metaAttr = {
  name: "meta_one",
  value: "10",
};

describe("Fence device meta attributes management", () => {
  afterEach(mock.stop);

  it("should be done successfully", async () => {
    mockWithStonith({
      fenceDeviceIdList: [fenceDeviceId],
      pcsdCapabilities: ["pcmk.resource.update-meta.stonith"],
      additionalRouteList: [
        mock.route.addMetaAttrRemote({
          clusterName,
          resourceId: fenceDeviceId,
          name: metaAttr.name,
          value: metaAttr.value,
          isStonith: true,
        }),
      ],
    });

    await goToFenceDevice(fenceDeviceId);
    await click(tabs.meta);
    await click(meta.toolbar.create);

    await fill(task.name, metaAttr.name);
    await fill(task.value, metaAttr.value);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should display no capability warning", async () => {
    mockWithStonith({fenceDeviceIdList: [fenceDeviceId]});

    await goToFenceDevice(fenceDeviceId);
    await click(tabs.meta);
    await isVisible(meta.noCapabilityWarning);
  });

  it("should display error when occurred meta attr create", async () => {
    mockWithStonith({
      fenceDeviceIdList: [fenceDeviceId],
      pcsdCapabilities: ["pcmk.resource.update-meta.stonith"],
      additionalRouteList: [
        mock.route.addMetaAttrRemote({
          clusterName,
          resourceId: fenceDeviceId,
          name: metaAttr.name,
          value: metaAttr.value,
          response: {status: [400, "Error adding meta attribute"]},
          isStonith: true,
        }),
      ],
    });

    await goToFenceDevice(fenceDeviceId);
    await click(tabs.meta);
    await click(meta.toolbar.create);

    await fill(task.name, metaAttr.name);
    await fill(task.value, metaAttr.value);

    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
