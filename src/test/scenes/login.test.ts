import {clusterStatus} from "dev/responses";

import {dt} from "test/tools/selectors";
import {intercept, location, route} from "test/tools";
import * as workflow from "test/workflow";

const username = "hacluster";
const password = "hh";
describe("Login scene", () => {
  it("should be rendered and can send credentials", async () => {
    await intercept.run([
      route.importedClusterList({response: {status: 401}}),
      route.login({username, password}),
    ]);

    await page.goto(location.dashboard);
    await workflow.login.submitForm({username, password});
    await intercept.stop();
  });
});

describe("Logout", () => {
  const MENU = dt("menu-user");
  const LOGOUT = dt(MENU, "logout");

  it("should call logout on backend after click", async () => {
    await intercept.run([
      route.importedClusterList(),
      route.clusterStatus({clusterStatus: clusterStatus.empty}),
      route.logout(),
      // TODO Firefox wants to have this mocked. Why
      route.login({username, password}),
    ]);
    await page.goto(location.dashboard);
    await page.click(MENU);
    await page.click(LOGOUT);
    await intercept.stop();
  });
});
