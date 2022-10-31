import {dt} from "test/tools/selectors";

export const gotoDashboard = async () => {
  await page.click(dt("breadcrumb", "dashboard"));
};
