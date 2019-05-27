const { expect } = require("chai");
const { page } = require("app/test/store");

const {
  getPollyManager,
  addRecording,
  url,
} = require("app/test/tools");

const dashboardResponses = require("app/scenes/dashboard/test/responses");
const dashboardRequests = require("app/scenes/dashboard/test/requests");
const [requests, records] = addRecording(require("./requests"));

const pollyManager = getPollyManager(() => page());

describe("Login scene", () => {
  const LOGIN_FORM_SELECTOR = '[data-role="login-form"]';
  const loginForm = (selectors = "") => (
    `${LOGIN_FORM_SELECTOR} ${selectors}`.trim()
  );

  afterEach(async () => { await pollyManager().stop(); });

  it("should be rendered and can send credentials", async () => {
    pollyManager().reset([
      dashboardRequests.overview((req, res) => {
        res.status(401).send();
      }),
      requests.login((req, res) => res.send("ajax-id-not-important")),
    ]);
    const username = "hacluster";
    const password = "hh";

    await page().goto(url());
    await page().waitFor(loginForm());
    await page().type(loginForm('[name="pf-login-username-id"]'), username);
    await page().type(loginForm('[name="pf-login-password-id"]'), password);
    await page().click(loginForm('button[type="submit"]'));

    expect(records.login.length).to.eql(1);
    expect(records.login[0].body).to.eql("username=hacluster&password=hh");
  });
});

describe("Logout", () => {
  const MENU_SELECTOR = '[data-role="user-menu"]';
  const LOGOUT_SELECTOR = '[data-role="logout"]';

  afterEach(async () => { await pollyManager().stop(); });

  it("should call logout on backend after click", async () => {
    pollyManager().reset([
      dashboardRequests.overview((req, res) => {
        res.json(dashboardResponses.dashboard([]));
      }),
      requests.logout((req, res) => res.send("OK")),
    ]);
    await page().goto(url());
    await page().waitFor(MENU_SELECTOR);
    await page().click(MENU_SELECTOR);
    await page().waitFor(LOGOUT_SELECTOR);
    await page().click(LOGOUT_SELECTOR);

    expect(records.logout.length).to.eql(1);
  });
});
