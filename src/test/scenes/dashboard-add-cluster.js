const { expect } = require("chai");

const { page } = require("test/store");
const { getPollyManager } = require("test/tools/pollyManager");
const { url } = require("test/tools/backendAddress");
const { spyRequests, clearSpyLog } = require("test/tools/endpointSpy");
const { dt } = require("test/tools/selectors");

const responses = require("dev/api/responses/all");
const [endpoints, spy] = spyRequests(require("dev/api/endpoints"));

const WIZARD = dt("wizard-add-cluster");
const WIZARD_BUTTON_NEXT = dt(WIZARD, "footer [type='submit']");
const FORM_CHECK_AUTH = dt(WIZARD, "form-auth-check");

const pollyManager = getPollyManager(() => page());

const isButtonNextDisabled = async () => {
  const isDisabled = await page().$eval(
    WIZARD_BUTTON_NEXT,
    buttonNext => buttonNext.attributes.disabled !== undefined,
  );
  return isDisabled;
};

const enterNodeName = async (name) => {
  await page().goto(url("/add-cluster"));
  await page().waitFor(FORM_CHECK_AUTH);

  await page().type(dt(FORM_CHECK_AUTH, "node-name"), name);
  await page().click(dt(FORM_CHECK_AUTH, "auth-check"));
};

const goThroughAddStepSuccessfully = async () => {
  await page().waitFor(dt(FORM_CHECK_AUTH, "auth-check-success"));
  await page().click(WIZARD_BUTTON_NEXT);
  await page().waitFor(dt(WIZARD, "add-success"));
};

const fillAuthenticationForm = async (passwordValue, addrValue, portValue) => {
  await page().click(dt(WIZARD, "use-custom-address"));
  await page().type(dt(WIZARD, "password"), passwordValue);
  await page().type(dt(WIZARD, "address"), addrValue);
  await page().type(dt(WIZARD, "port"), portValue);
  await page().click(dt(FORM_CHECK_AUTH, "auth-node"));
};

const authFailed = async () => {
  await page().waitFor(dt(WIZARD, "auth-check-error"));
  expect(await isButtonNextDisabled()).to.equal(true);
};

const verifyAuthRequest = (spyLog, nodeName, password, addr, port) => {
  expect(spyLog.length).to.eql(1);
  expect(spyLog[0].body).to.eql(
    `data_json=${encodeURIComponent(
      JSON.stringify({
        nodes: {
          [nodeName]: {
            password,
            dest_list: [{ addr, port }],
          },
        },
      }),
    )}`,
  );
};

const verifyCheckAuthRequest = (spyLog, nodeName) => {
  expect(spyLog.length).to.eql(1);
  expect(spyLog[0].query).to.eql({ node_list: [nodeName] });
};

const verifyAddRequest = (spyLog, nodeName) => {
  expect(spyLog.length).to.eql(1);
  expect(spyLog[0].body).to.eql(`node-name=${nodeName}`);
};

const getDashboard = endpoints.clustersOverview((req, res) => {
  res.json(responses.clustersOverview.empty);
});

describe("Add existing cluster wizard", () => {
  const nodeName = "nodeA";
  const password = "pwd";
  const addr = "192.168.0.10";
  const port = "1234";

  afterEach(async () => {
    clearSpyLog(spy);
    await pollyManager().stop();
  });

  it("should succesfully add cluster", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) =>
        res.json({ [nodeName]: "Online" })),
      endpoints.addCluster((req, res) => res.send("")),
    ]);

    await enterNodeName(nodeName);
    await goThroughAddStepSuccessfully();

    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
    verifyAddRequest(spy.addCluster, nodeName);
  });

  it("should succesfully add cluster with authentication", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) =>
        res.json({
          [nodeName]: "Unable to authenticate",
        })),
      endpoints.authenticateAgainstNodes((req, res) =>
        res.json({ node_auth_error: { [nodeName]: 0 } })),
      endpoints.addCluster((req, res) => res.send("")),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(dt(FORM_CHECK_AUTH, "password"));
    await fillAuthenticationForm(password, addr, port);
    await goThroughAddStepSuccessfully();

    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
    verifyAuthRequest(
      spy.authenticateAgainstNodes,
      nodeName,
      password,
      addr,
      port,
    );
    verifyAddRequest(spy.addCluster, nodeName);
  });

  it("should display error when auth check crash on backend", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) =>
        res.status(500).send("WRONG")),
    ]);

    await enterNodeName(nodeName);
    await authFailed();
    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
  });

  it("should display error when auth check response is nonesense", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) => res.json("nonsense")),
    ]);

    await enterNodeName(nodeName);
    await authFailed();
    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
  });

  it("should display error when auth check response is offline", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) =>
        res.json({ [nodeName]: "Offline" })),
    ]);

    await enterNodeName(nodeName);
    await authFailed();
    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
  });

  it("should display error when authentication fails", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) =>
        res.json({
          [nodeName]: "Unable to authenticate",
        })),
      endpoints.authenticateAgainstNodes((req, res) =>
        res.json({ node_auth_error: { [nodeName]: 1 } })),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(dt(FORM_CHECK_AUTH, "password"));
    await fillAuthenticationForm(password, addr, port);
    await page().waitFor(dt(WIZARD, "auth-error"));

    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
    verifyAuthRequest(
      spy.authenticateAgainstNodes,
      nodeName,
      password,
      addr,
      port,
    );
  });

  it("should display error when cluster add fails", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) =>
        res.json({ [nodeName]: "Online" })),
      endpoints.addCluster((req, res) =>
        res.status(400).send("Configuration conflict detected.")),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(dt(WIZARD, "auth-check-success"));
    await page().click(WIZARD_BUTTON_NEXT);
    await page().waitFor(dt(WIZARD, "add-error"));

    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
    verifyAddRequest(spy.addCluster, nodeName);
  });
});
