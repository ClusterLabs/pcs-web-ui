const { expect } = require("chai");
const { page } = require("app/test/store");
const {
  url,
  getPollyManager,
  addRecording,
  clearRecords,
} = require("app/test/tools");

const dashboardResponses = require("app/scenes/dashboard/test/responses");
const dashboardRequests = require("app/scenes/dashboard/test/requests");
const [requests, records] = addRecording(require("./requests"));

const role = name => `[data-role=${name}]`;
const WIZARD_SELECTOR = role("add-cluster-wizard");
const wizzard = (selectors = "") => `${WIZARD_SELECTOR} ${selectors}`.trim();

const pollyManager = getPollyManager(() => page());

const isButtonNextDisabled = async () => {
  const isDisabled = await page().$eval(
    wizzard("footer [type='submit']"),
    buttonNext => buttonNext.attributes.disabled !== undefined,
  );
  return isDisabled;
};

const enterNodeName = async (name) => {
  await page().goto(url("/add-cluster"));
  await page().waitFor(wizzard());

  await page().type(wizzard("[name='node-name']"), name);
  await page().click(wizzard(role("check-node-authentication")));
};

const goThroughAddStepSuccessfully = async () => {
  await page().waitFor(wizzard(role("auth-success-message")));
  await page().click(wizzard("footer [type='submit']"));
  await page().waitFor(wizzard(role("add-cluster-success")));
};

const fillAuthenticationForm = async (passwordValue, addrValue, portValue) => {
  await page().click(wizzard("#add-cluster-use-custom-address-port"));
  await page().type(wizzard("[name='password']"), passwordValue);
  await page().type(wizzard("[name='address']"), addrValue);
  await page().type(wizzard("[name='port']"), portValue);
  await page().click(wizzard(role("authenticate-node")));
};

const authFailed = async () => {
  await page().waitFor(wizzard(role("auth-error-message")));
  expect(await isButtonNextDisabled()).to.equal(true);
};

const verifyAuthRequest = (record, nodeName, password, addr, port) => {
  expect(record.length).to.eql(1);
  expect(record[0].body).to.eql(
    `data_json=${
      encodeURIComponent(JSON.stringify({
        nodes: {
          [nodeName]: {
            password,
            dest_list: [{ addr, port }],
          },
        },
      }))
    }`,
  );
};

const verifyCheckAuthRequest = (record, nodeName) => {
  expect(record.length).to.eql(1);
  expect(record[0].query).to.eql({ node_list: [nodeName] });
};

const verifyAddRequest = (record, nodeName) => {
  expect(record.length).to.eql(1);
  expect(record[0].body).to.eql(`node-name=${nodeName}`);
};

const getDashboard = dashboardRequests.overview(
  (req, res) => { res.json(dashboardResponses.dashboard([])); },
);

describe("Add existing cluster", () => {
  const nodeName = "nodeA";
  const password = "pwd";
  const addr = "192.168.0.10";
  const port = "1234";

  afterEach(async () => {
    clearRecords(records);
    await pollyManager().stop();
  });

  it("should succesfully add cluster", async () => {
    pollyManager().reset([
      getDashboard,
      requests.checkAuth((req, res) => res.json({ [nodeName]: "Online" })),
      requests.addCluster((req, res) => res.send("")),
    ]);

    await enterNodeName(nodeName);
    await goThroughAddStepSuccessfully();

    verifyCheckAuthRequest(records.checkAuth, nodeName);
    verifyAddRequest(records.addCluster, nodeName);
  });

  it("should succesfully add cluster with authentication", async () => {
    pollyManager().reset([
      getDashboard,
      requests.checkAuth((req, res) => res.json({
        [nodeName]: "Unable to authenticate",
      })),
      requests.authenticate(
        (req, res) => res.json({ node_auth_error: { [nodeName]: 0 } }),
      ),
      requests.addCluster((req, res) => res.send("")),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(wizzard(role("auth-form")));
    await fillAuthenticationForm(password, addr, port);
    await goThroughAddStepSuccessfully();

    verifyCheckAuthRequest(records.checkAuth, nodeName);
    verifyAuthRequest(records.authenticate, nodeName, password, addr, port);
    verifyAddRequest(records.addCluster, nodeName);
  });

  it("should display error when auth check crash on backend", async () => {
    pollyManager().reset([
      getDashboard,
      requests.checkAuth((req, res) => res.status(500).send("WRONG")),
    ]);

    await enterNodeName(nodeName);
    await authFailed();
    verifyCheckAuthRequest(records.checkAuth, nodeName);
  });

  it("should display error when auth check response is nonesense", async () => {
    pollyManager().reset([
      getDashboard,
      requests.checkAuth((req, res) => res.json("nonsense")),
    ]);

    await enterNodeName(nodeName);
    await authFailed();
    verifyCheckAuthRequest(records.checkAuth, nodeName);
  });

  it("should display error when auth check response is offline", async () => {
    pollyManager().reset([
      getDashboard,
      requests.checkAuth((req, res) => res.json({ [nodeName]: "Offline" })),
    ]);

    await enterNodeName(nodeName);
    await authFailed();
    verifyCheckAuthRequest(records.checkAuth, nodeName);
  });

  it("should display error when authentication fails", async () => {
    pollyManager().reset([
      getDashboard,
      requests.checkAuth((req, res) => res.json({
        [nodeName]: "Unable to authenticate",
      })),
      requests.authenticate(
        (req, res) => res.json({ node_auth_error: { [nodeName]: 1 } }),
      ),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(wizzard(role("auth-form")));
    await fillAuthenticationForm(password, addr, port);
    await page().waitFor(wizzard(role("authentication-failed")));

    verifyCheckAuthRequest(records.checkAuth, nodeName);
    verifyAuthRequest(records.authenticate, nodeName, password, addr, port);
  });

  it("should display error when cluster add fails", async () => {
    pollyManager().reset([
      getDashboard,
      requests.checkAuth((req, res) => res.json({ [nodeName]: "Online" })),
      requests.addCluster((req, res) => res.status(400).send(
        "Configuration conflict detected.",
      )),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(wizzard(role("auth-success-message")));
    await page().click(wizzard("footer [type='submit']"));
    await page().waitFor(wizzard(role("add-cluster-error-message")));

    verifyCheckAuthRequest(records.checkAuth, nodeName);
    verifyAddRequest(records.addCluster, nodeName);
  });
});
