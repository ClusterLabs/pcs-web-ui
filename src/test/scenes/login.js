const { expect } = require("chai");
const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url } = require("test/tools/backendAddress");
const { spyRequests } = require("test/tools/endpointSpy");
const { dt } = require("test/tools/selectors");
const responses = require("dev/api/responses/all");
const [endpoints, spy] = spyRequests(require("dev/api/endpoints"));

const pollyManager = getPollyManager(() => page());

describe("Login scene", () => {
  const FORM_LOGIN = dt("form-login");

  afterEach(async () => {
    await pollyManager().stop();
  });

  it("should be rendered and can send credentials", async () => {
    pollyManager().reset([
      endpoints.importedClusterList((req, res) => {
        res.status(401).send();
      }),
      endpoints.login((req, res) => res.send("ajax-id-not-important")),
    ]);
    const username = "hacluster";
    const password = "hh";

    await page().goto(url());
    await page().waitFor(FORM_LOGIN);
    await page().type(
      dt(FORM_LOGIN, '[name="pf-login-username-id"]'),
      username,
    );
    await page().type(
      dt(FORM_LOGIN, '[name="pf-login-password-id"]'),
      password,
    );
    await page().click(dt(FORM_LOGIN, 'button[type="submit"]'));

    expect(spy.login.length).to.eql(1);
    expect(spy.login[0].body).to.eql("username=hacluster&password=hh");
  });
});

describe("Logout", () => {
  const MENU = dt("menu-user");
  const LOGOUT = dt(MENU, "logout");

  afterEach(async () => {
    await pollyManager().stop();
  });

  it("should call logout on backend after click", async () => {
    pollyManager().reset([
      endpoints.importedClusterList((req, res) => {
        res.json(responses.importedClusterList.empty);
      }),
      endpoints.logout((req, res) => res.send("OK")),
    ]);
    await page().goto(url());
    await page().waitFor(MENU);
    await page().click(MENU);
    await page().waitFor(LOGOUT);
    await page().click(LOGOUT);

    expect(spy.logout.length).to.eql(1);
  });
});
