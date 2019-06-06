const { expect } = require("chai");
const { page } = require("app/test/store");
const {
  url,
  getPollyManager,
  spyRequests,
  clearSpyLog,
} = require("app/test/tools");

const dashboardResponses = require("app/scenes/dashboard/test/responses");
const [endpoints, spy] = spyRequests(require("dev/api/endpoints"));

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

const verifyAuthRequest = (spyLog, nodeName, password, addr, port) => {
  expect(spyLog.length).to.eql(1);
  expect(spyLog[0].body).to.eql(
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

const verifyCheckAuthRequest = (spyLog, nodeName) => {
  expect(spyLog.length).to.eql(1);
  expect(spyLog[0].query).to.eql({ node_list: [nodeName] });
};

const verifyAddRequest = (spyLog, nodeName) => {
  expect(spyLog.length).to.eql(1);
  expect(spyLog[0].body).to.eql(`node-name=${nodeName}`);
};

const getDashboard = endpoints.clustersOverview(
  (req, res) => { res.json(dashboardResponses.dashboard([])); },
);

describe("Add existing cluster", () => {
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
      endpoints.checkAuthAgainstNodes(
        (req, res) => res.json({ [nodeName]: "Online" }),
      ),
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
      endpoints.checkAuthAgainstNodes((req, res) => res.json({
        [nodeName]: "Unable to authenticate",
      })),
      endpoints.authenticateAgainstNodes(
        (req, res) => res.json({ node_auth_error: { [nodeName]: 0 } }),
      ),
      endpoints.addCluster((req, res) => res.send("")),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(wizzard(role("auth-form")));
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
      endpoints.checkAuthAgainstNodes(
        (req, res) => res.status(500).send("WRONG"),
      ),
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
      endpoints.checkAuthAgainstNodes(
        (req, res) => res.json({ [nodeName]: "Offline" }),
      ),
    ]);

    await enterNodeName(nodeName);
    await authFailed();
    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
  });

  it("should display error when authentication fails", async () => {
    pollyManager().reset([
      getDashboard,
      endpoints.checkAuthAgainstNodes((req, res) => res.json({
        [nodeName]: "Unable to authenticate",
      })),
      endpoints.authenticateAgainstNodes(
        (req, res) => res.json({ node_auth_error: { [nodeName]: 1 } }),
      ),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(wizzard(role("auth-form")));
    await fillAuthenticationForm(password, addr, port);
    await page().waitFor(wizzard(role("authentication-failed")));

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
      endpoints.checkAuthAgainstNodes(
        (req, res) => res.json({ [nodeName]: "Online" }),
      ),
      endpoints.addCluster((req, res) => res.status(400).send(
        "Configuration conflict detected.",
      )),
    ]);

    await enterNodeName(nodeName);
    await page().waitFor(wizzard(role("auth-success-message")));
    await page().click(wizzard("footer [type='submit']"));
    await page().waitFor(wizzard(role("add-cluster-error-message")));

    verifyCheckAuthRequest(spy.checkAuthAgainstNodes, nodeName);
    verifyAddRequest(spy.addCluster, nodeName);
  });
});
