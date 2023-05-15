import {dt} from "test/tools/selectors";

export const getRoleList = async () => {
  return await page.$$eval(
    dt("group-detail", "detail-card", "role-list", "list-item"),
    resourceElements =>
      resourceElements.map(
        e => e.querySelector("[data-test='name']")?.textContent ?? "",
      ),
  );
};
