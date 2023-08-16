import {clusterStatus} from "dev/responses";

import {mock} from "test/tools";

const username = "hacluster";
const password = "hh";

describe("Login scene", () => {
  afterEach(mock.stop);
  it("should be rendered and can send credentials", async () => {
    await mock.run([
      mock.route.importedClusterList({response: {status: 401}}),
      mock.route.login({username, password}),
    ]);

    await page.goto(backend.rootUrl);
    await login(username, password);
  });
});

describe("Logout", () => {
  it("should call logout on backend after click", async () => {
    await mock.run([
      mock.route.importedClusterList(),
      mock.route.clusterStatus({clusterStatus: clusterStatus.empty}),
      mock.route.logout(),
      // TODO Firefox wants to have this mocked. Why
      mock.route.login({username, password}),
    ]);
    await page.goto(backend.rootUrl);
    await click(marks.header.userMenu);
    await click(marks.header.userMenu.logout);
  });
});
