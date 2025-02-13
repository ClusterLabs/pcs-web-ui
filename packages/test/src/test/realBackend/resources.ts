import {waitForResponse} from "./waitForResponse";

const {resources, resourcesToolbar} = marks.cluster;
const {resourceCreate: task} = marks.task;

export const create = async (resourceId: string, agentName: string) => {
  await click(resourcesToolbar.createResource);

  await fill(task.nameType.name, resourceId);
  await select(task.nameType.agentName, agentName.split(":").at(-1));
  await click([
    task.nameTypeFooter.next,
    task.instanceAttrsFooter.next,
    task.settingsFooter.next,
  ]);
  await Promise.all([
    waitForResponse(/.*\/cluster_status$/),
    await click(task.reviewFooter.next),
    await isVisible(task.success),
  ]);
  await click(task.success.close);
};

export const assertEmptyTree = async () => {
  await isVisible(resources.empty);
  await isAbsent(resources.tree);
};

export const assertVisibleInTree = async (resourceId: string) => {
  await isVisible(resources.tree);
  await isVisible(item.byId(resources.tree.primitive, resourceId, p => p.id));
};

export const openDetail = async (resourceId: string) => {
  await click(item.byId(resources.tree.primitive, resourceId, p => p.id));
};

export const assertAgentInfoInDetail = async () => {
  await isVisible(resources.currentPrimitive.detail.pcmkAgent);
};

export const selectTab = async () => {
  await click(marks.clusterTabs.resources);
};
