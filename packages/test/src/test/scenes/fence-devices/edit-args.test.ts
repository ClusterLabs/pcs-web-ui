import {mock} from "test/tools";

import {clusterName, goToFenceDevice, mockWithStonith} from "./common";

const {tabs, argumentsToolbar} = marks.cluster.fenceDevices.currentFenceDevice;
const {fenceDeviceArgumentsEdit: task} = marks.task;

const fenceDeviceId = "F1";
const attributes = {
  cmd_prompt: "cmd:prompt",
  ip: "127.0.0.1",
};

const launchTask = async (id: string) => {
  await goToFenceDevice(id);
  await click(tabs.arguments);
  await click(argumentsToolbar.edit);
};

const fillArgs = async () => {
  await fill(
    item.byName(task.arg, "cmd_prompt", a => a.value),
    attributes.cmd_prompt,
  );
  await fill(
    item.byName(task.arg, "ip", a => a.value),
    attributes.ip,
  );
};

describe("Edit fence device args", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mockWithStonith({
      fenceDeviceIdList: [fenceDeviceId],
      additionalRouteList: [
        mock.route.updateFenceDevice({
          clusterName,
          fenceDeviceId,
          attributes,
        }),
      ],
    });
    await launchTask(fenceDeviceId);
    await fillArgs();

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should deal with backend error", async () => {
    mockWithStonith({
      fenceDeviceIdList: [fenceDeviceId],
      additionalRouteList: [
        mock.route.updateFenceDevice({
          clusterName,
          fenceDeviceId,
          attributes,
          response: {
            text: JSON.stringify({
              error: "true",
              stdout: "some stdout",
              stderr: "some stderr",
            }),
          },
        }),
      ],
    });
    await launchTask(fenceDeviceId);
    await fillArgs();

    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
