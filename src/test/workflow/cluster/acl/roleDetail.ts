import { dt } from "test/tools/selectors";

export const getPermissionList = async () => {
  return await page.$$eval(
    dt("group-detail", "detail-card", "permission-list", "list-item"),
    resourceElements =>
      resourceElements.map(
        e => e.querySelector("[data-test='name']")?.textContent ?? "",
      ),
  );
};
