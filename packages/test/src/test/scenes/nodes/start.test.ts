import {intercept, location, route, shortcuts} from "test/tools";
import {dt} from "test/tools/selectors";
import {getConfirmDialog} from "test/components";

const nodeName = "node-1";
const clusterName = "ok";

const launchAction = async () => {
  await page.goto(location.node({clusterName, nodeName}));
  await page.click(dt("task node-start"));
};

const confirmDialog = getConfirmDialog("start");

describe("Node start", () => {
  afterEach(intercept.stop);

  it("should successfully start", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [route.clusterStart({clusterName, nodeName})],
    });

    await launchAction();

    await confirmDialog.confirm();
    await page.waitForSelector(dt("notification-success"));
  });

  it("should be cancelable", async () => {
    shortcuts.interceptWithCluster({clusterName});

    await launchAction();

    await confirmDialog.isDisplayed();
    await confirmDialog.cancel();
    await confirmDialog.isHidden();
  });

  it("should deal with an error from backend", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.clusterStart({
          clusterName,
          nodeName,
          response: {status: [400, "Unable to start node."]},
        }),
      ],
    });

    await launchAction();

    await confirmDialog.confirm();
    await page.waitForSelector(dt("notification-danger"));
  });
});
