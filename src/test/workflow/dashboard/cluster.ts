import { dt } from "test/tools/selectors";

import { confirmDialog } from "../confirmDialog";

export const cluster = (clusterName: string) => {
  const confirmation = confirmDialog("destroy");
  const click = async () => {
    await page.click(
      dt("cluster-list", `cluster ${clusterName}`, '[aria-label="Actions"]'),
    );
    await page.click(dt("destroy-cluster"));
    await confirmation.isDisplayed();
  };
  return {
    destroy: {
      click,

      cancel: async () => {
        await confirmation.cancel();
        await confirmation.isHidden();
      },

      launch: async () => {
        await click();
        await confirmation.confirm();
      },
    },
  };
};
