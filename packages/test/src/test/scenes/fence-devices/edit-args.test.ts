import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {
  clusterName,
  goToFenceDevices,
  mockWithStonith,
  openFenceDevice,
} from "./common";

const {item} = shortcuts.common;

const {tabs, argumentsToolbar} = marks.cluster.fenceDevices.currentFenceDevice;
const {fenceDeviceArgumentsEdit: task} = marks.task;

const fenceDeviceId = "F1";
const attributes = {
  cmd_prompt: "cmd:prompt",
  ip: "127.0.0.1",
};

const fillArg = async (name: string, value: string) => {
  const {arg} = task;
  await fill(item(arg).byKey(arg.name, name).locator(arg.value), value);
};

const launchTask = async (id: string) => {
  await goToFenceDevices();
  await openFenceDevice(id);
  await click(tabs.arguments);
  await click(argumentsToolbar.edit);
};

const fillArgs = async () => {
  await fillArg("cmd_prompt", attributes.cmd_prompt);
  await fillArg("ip", attributes.ip);
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
