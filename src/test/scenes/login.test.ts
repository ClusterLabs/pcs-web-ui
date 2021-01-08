import { clusterStatus, importedClusterList } from "dev/responses";

import { dt } from "test/tools/selectors";
import { intercept, url, urls } from "test/tools";

const username = "hacluster";
const password = "hh";
describe("Login scene", () => {
  it("should be rendered and can send credentials", async () => {
    const FORM_LOGIN = dt("form-login");

    await intercept.run([
      {
        url: urls.importedClusterList,
        status: 401,
      },
      {
        url: urls.login,
        body: { username, password },
        text: "ajax-id-not-important",
      },
    ]);

    await page.goto(url());
    await page.type(dt(FORM_LOGIN, '[name="pf-login-username-id"]'), username);
    await page.type(dt(FORM_LOGIN, '[name="pf-login-password-id"]'), password);
    await page.click(dt(FORM_LOGIN, 'button[type="submit"]'));
    await intercept.stop();
  });
});

describe("Logout", () => {
  const MENU = dt("menu-user");
  const LOGOUT = dt(MENU, "logout");

  it("should call logout on backend after click", async () => {
    await intercept.run([
      {
        url: urls.importedClusterList,
        json: importedClusterList.empty,
      },
      {
        url: urls.clusterStatus({ clusterName: "empty" }),
        json: clusterStatus.empty,
      },
      {
        url: urls.logout,
        text: "OK",
      },
      // TODO Firefox wants to have this mocked. Why
      {
        url: urls.login,
        body: { username, password },
        text: "ajax-id-not-important",
      },
    ]);
    await page.goto(url());
    await page.click(MENU);
    await page.click(LOGOUT);
    await intercept.stop();
  });
});
