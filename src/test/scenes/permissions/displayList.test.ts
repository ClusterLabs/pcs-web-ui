import * as responses from "dev/responses";

import { intercept, location, route, shortcuts } from "test/tools";
import { mkXPath } from "test/tools/selectors";

type CompetenceParts = "read" | "write" | "grant" | "full";
type PermissionParts = CompetenceParts | "name" | "type";
type PermissionList = ReturnType<
  typeof responses.permissions
>["users_permissions"];

const clusterName = "ok";

const list = "permission-list";
const permissionsStructure = {
  row: (i: number, permissionPart: PermissionParts) =>
    mkXPath(list, `permission-${i}-${permissionPart}`),
};

const permissionsResponseData: PermissionList = [
  { type: "user", name: "name", allow: ["read"] },
  {
    type: "group",
    name: "haclient",
    allow: ["grant", "read", "write"],
  },
];

const checkPermissionRowValue = async (
  i: number,
  permissionPart: Parameters<typeof permissionsStructure.row>[1],
  expectedValue: string,
) => {
  const [value] = await page.$$eval(
    permissionsStructure.row(i, permissionPart),
    el => el.map(e => (e as HTMLElement).innerText),
  );
  expect(value.trim()).toEqual(expectedValue);
};

const checkPermissionRowCompetence = async (
  i: number,
  competence: CompetenceParts,
) => {
  await checkPermissionRowValue(
    i,
    competence,
    permissionsResponseData[i].allow.includes(competence)
      ? "Allowed"
      : "Disallowed",
  );
};

const checkPermissionRow = async (i: number) => {
  const permission = permissionsResponseData[i];
  await checkPermissionRowValue(i, "name", permission.name);
  await checkPermissionRowValue(i, "type", permission.type);
  await checkPermissionRowCompetence(i, "read");
  await checkPermissionRowCompetence(i, "write");
  await checkPermissionRowCompetence(i, "grant");
  await checkPermissionRowCompetence(i, "full");
};

describe("Pemissions", () => {
  afterEach(intercept.stop);

  it("should be displayed according to response data", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      replaceRoutes: {
        permissions: route.getPermissions({
          clusterName,
          permissions: {
            ...responses.permissions(),
            users_permissions: permissionsResponseData,
          },
        }),
      },
    });
    await page.goto(location.permissionList({ clusterName }));
    await checkPermissionRow(0);
    await checkPermissionRow(1);
  });
});
