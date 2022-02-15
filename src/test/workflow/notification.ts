import { dt } from "test/tools/selectors";

export const waitForSuccess = async () => {
  await page.waitForSelector(dt("notification-success"));
};

export const waitForFail = async () => {
  await page.waitForSelector(dt("notification-danger"));
};
