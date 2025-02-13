import {assert} from "test/tools";
import {waitForResponse} from "./waitForResponse";

const {fenceDevices, fenceDevicesToolbar} = marks.cluster;

export const create = async (fenceDeviceId: string, agentName: string) => {
  await click(fenceDevicesToolbar.createFenceDevice);

  const {fenceDeviceCreate: task} = marks.task;
  await fill(task.nameType.name, fenceDeviceId);
  await select(task.nameType.agentName, agentName);
  await click(task.nameTypeFooter.next);
  await click(task.instanceAttrsFooter.next);
  await click(task.settingsFooter.next);

  await Promise.all([
    waitForResponse(/.*\/cluster_status$/),
    await click(task.reviewFooter.next),
    await isVisible(task.success),
  ]);
  await click(task.success.close);
};

export const assertEmptyList = async () => {
  await isVisible(fenceDevices.empty);
  await isAbsent(fenceDevices.list);
};

export const assertVisibleInList = async (fenceDeviceId: string) => {
  await isVisible(fenceDevices.list);
  await assert.expectKeysAre(fenceDevices.list.item.id, [fenceDeviceId]);
};

export const selectTab = async () => {
  await click(marks.clusterTabs.fenceDevices);
};
