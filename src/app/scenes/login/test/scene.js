const { expect } = require("chai");
const { page } = require("app/test/store");

const {
  getPollyManager,
  spyRequests,
  url,
} = require("app/test/tools");

const responses = require("dev/api/responses/all");
const [endpoints, spy] = spyRequests(require("dev/api/endpoints"));

const pollyManager = getPollyManager(() => page());

describe("Login scene", () => {
  const LOGIN_FORM_SELECTOR = '[data-role="login-form"]';
  const loginForm = (selectors = "") => (
    `${LOGIN_FORM_SELECTOR} ${selectors}`.trim()
  );

  afterEach(async () => { await pollyManager().stop(); });

  it("should be rendered and can send credentials", async () => {
    pollyManager().reset([
      endpoints.clustersOverview((req, res) => {
        res.status(401).send();
      }),
      endpoints.login((req, res) => res.send("ajax-id-not-important")),
    ]);
    const username = "hacluster";
    const password = "hh";

    await page().goto(url());
    await page().waitFor(loginForm());
    await page().type(loginForm('[name="pf-login-username-id"]'), username);
    await page().type(loginForm('[name="pf-login-password-id"]'), password);
    await page().click(loginForm('button[type="submit"]'));

    expect(spy.login.length).to.eql(1);
    expect(spy.login[0].body).to.eql("username=hacluster&password=hh");
  });
});

describe("Logout", () => {
  const MENU_SELECTOR = '[data-role="user-menu"]';
  const LOGOUT_SELECTOR = '[data-role="logout"]';

  afterEach(async () => { await pollyManager().stop(); });

  it("should call logout on backend after click", async () => {
    pollyManager().reset([
      endpoints.clustersOverview((req, res) => {
        res.json(responses.clustersOverview.empty);
      }),
      endpoints.logout((req, res) => res.send("OK")),
    ]);
    await page().goto(url());
    await page().waitFor(MENU_SELECTOR);
    await page().click(MENU_SELECTOR);
    await page().waitFor(LOGOUT_SELECTOR);
    await page().click(LOGOUT_SELECTOR);

    expect(spy.logout.length).to.eql(1);
  });
});
