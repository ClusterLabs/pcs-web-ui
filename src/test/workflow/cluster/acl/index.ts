import {dt} from "test/tools/selectors";

export * as roleDetail from "./roleDetail";
export * as subjectDetail from "./subjectDetail";

export const roleLinkSelector = (roleName: string) =>
  dt("acl-role-list", `^list-item ${roleName}`, "link");

export const subjectLinkSelector = (
  subjectType: "user" | "group",
  name: string,
) => dt(`acl-${subjectType}-list`, `^list-item ${name}`, "link");

export const getRoleList = async () => {
  return await page.$$eval(
    dt("acl-role-list", "^list-item "),
    resourceElements =>
      resourceElements.map(e => ({
        name: e.querySelector("[data-test='name']")?.textContent ?? "",
        permissionsCount:
          e.querySelector("[data-test='permissions-count']")?.textContent ?? "",
        usersCount:
          e.querySelector("[data-test='users-count']")?.textContent ?? "",
        groupsCount:
          e.querySelector("[data-test='groups-count']")?.textContent ?? "",
      })),
  );
};

export const getSubjectList = async (subjectType: "user" | "group") => {
  return await page.$$eval(
    dt(`acl-${subjectType}-list`, "^list-item "),
    resourceElements =>
      resourceElements.map(e => ({
        name: e.querySelector("[data-test='name']")?.textContent ?? "",
        rolesCount:
          e.querySelector("[data-test='roles-count']")?.textContent ?? "",
      })),
  );
};
