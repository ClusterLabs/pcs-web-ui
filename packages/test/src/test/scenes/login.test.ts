import {clusterStatus} from "dev/responses";

import {intercept} from "test/tools";

const username = "hacluster";
const password = "hh";

describe("Login scene", () => {
  afterEach(intercept.stop);
  it("should be rendered and can send credentials", async () => {
    await intercept.run([
      intercept.route.importedClusterList({response: {status: 401}}),
      intercept.route.login({username, password}),
    ]);

    await page.goto(backend.rootUrl);
    await login(username, password);
  });
});

describe("Logout", () => {
  it("should call logout on backend after click", async () => {
    await intercept.run([
      intercept.route.importedClusterList(),
      intercept.route.clusterStatus({clusterStatus: clusterStatus.empty}),
      intercept.route.logout(),
      // TODO Firefox wants to have this mocked. Why
      intercept.route.login({username, password}),
    ]);
    await page.goto(backend.rootUrl);
    await click(marks.header.userMenu);
    await click(marks.header.userMenu.logout);
  });
});
