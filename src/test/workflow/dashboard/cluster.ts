import { getConfirmDialog, getDropdownMenu } from "test/components";

const clusterAction = (clusterName: string, action: "destroy" | "remove") => {
  const confirmDialog = getConfirmDialog(action);
  const menu = getDropdownMenu("cluster-list", `cluster ${clusterName}`);

  const click = async () => {
    await menu.launchItem(`cluster-${action}`);
    await confirmDialog.isDisplayed();
  };

  return {
    click,

    cancel: async () => {
      await confirmDialog.cancel();
      await confirmDialog.isHidden();
    },

    launch: async () => {
      await click();
      await confirmDialog.confirm();
    },
  };
};

export const cluster = (clusterName: string) => ({
  destroy: clusterAction(clusterName, "destroy"),
  remove: clusterAction(clusterName, "remove"),
});
