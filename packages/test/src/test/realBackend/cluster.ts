const {noCluster, overviewToolbar} = marks.cluster;
const {clusterSetup: task} = marks.task;

// The application refreshes the cluster status right after the cluster start
// and then every 30 seconds. The cluster needs a while to start, so the
// refresh right after the start can still see it not running. The timeout
// covers the next two periodic refreshes.
const clusterStartTimeout = 70_000;

export const assertNoCluster = async () => {
  await isVisible(noCluster);
};

export const setupFromNoCluster = async (
  clusterName: string,
  nodeName: string,
) => {
  await click(noCluster.setupCluster);

  await fill(task.nameAndNodes.clusterName, clusterName);
  await fill(task.nameAndNodes.node.name.locator.nth(0), nodeName);
  await click(task.nameAndNodesFooter.next);
  await click(task.prepareNodesFooter.reviewAndFinish);
  await click(task.reviewFooter.next);

  await isVisible(task.success);
  await click(task.success.startAndClose);
};

export const waitForReady = async () => {
  await marks.clusterToolbarInfo.clusterStatus.locator
    .filter({hasText: /^(running|inoperative)$/})
    .waitFor({state: "visible", timeout: clusterStartTimeout});
};

export const selectOverviewTab = async () => {
  await click(marks.clusterTabs.overview);
};

export const destroy = async () => {
  await dropdown(
    overviewToolbar.dropdown,
    overviewToolbar.dropdown.destroyCluster,
  );
  await Promise.all([
    isVisible(
      marks.notifications.toast.success.locator.getByText("Cluster destroyed"),
    ),
    appConfirm.run("Destroy the cluster?"),
  ]);
};
