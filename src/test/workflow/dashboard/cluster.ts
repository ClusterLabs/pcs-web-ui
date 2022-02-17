import { dt } from "test/tools/selectors";

import { confirmDialog } from "../confirmDialog";

const clusterAction = (clusterName: string, action: "destroy" | "remove") => {
  const confirmation = confirmDialog(action);
  const click = async () => {
    await page.click(
      dt("cluster-list", `cluster ${clusterName}`, '[aria-label="Actions"]'),
    );
    await page.click(dt(`${action}-cluster`));
    await confirmation.isDisplayed();
  };

  return {
    click,

    cancel: async () => {
      await confirmation.cancel();
      await confirmation.isHidden();
    },

    launch: async () => {
      await click();
      await confirmation.confirm();
    },
  };
};

export const cluster = (clusterName: string) => ({
  destroy: clusterAction(clusterName, "destroy"),
  remove: clusterAction(clusterName, "remove"),
});
