import {endpoints} from "app/backend/endpoints";

import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const username = "hacluster";
const password = "hh";

const clusterStatus = cs.cluster("test-cluster", "ok");

describe("Login scene", () => {
  afterEach(mock.stop);
  it("should be rendered and can send credentials", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      replaceRoutes: {
        clusterStatus: mock.route.clusterStatus({response: {status: 401}}),
      },
      additionalRouteList: [mock.route.login({username, password})],
    });

    await goToCluster();
    // The mocked cluster status keeps responding 401, so there is no visible
    // outcome of the login. Waiting for the login response guarantees that
    // the request (with the credentials) is checked at teardown.
    await Promise.all([
      page.waitForResponse(r => r.url().endsWith(endpoints.login.url)),
      login(username, password),
    ]);
  });
});

describe("Logout", () => {
  afterEach(mock.stop);
  it("should call logout on backend after click", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.logout(),
        // TODO Firefox wants to have this mocked. Why
        mock.route.login({username, password}),
      ],
    });
    await goToCluster();
    await click(marks.header.userMenu);
    await click(marks.header.userMenu.logout);
    await isVisible(marks.login.form);
  });
});
