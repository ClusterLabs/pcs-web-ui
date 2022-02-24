import { dt } from "test/tools/selectors";

export * as fenceDevices from "./fenceDevices";

export const selectTab = async (tabName: string) => {
  await page.click(dt("tabs cluster", tabName));
};
