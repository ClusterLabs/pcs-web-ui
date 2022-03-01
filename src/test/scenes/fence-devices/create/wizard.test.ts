import * as responses from "dev/responses";

import { intercept, location, route, shortcuts } from "test/tools";
import * as workflow from "test/workflow";

const fenceDeviceName = "F1";
const clusterName = "actions";
const agentName = "fence_apc";
const ip = "127.0.0.1";
const username = "user1";

const {
  assertReview,
  fillAttributes,
  fillNameAndAgent,
  nextFrom,
  open,
  waitForSuccess,
} = workflow.task.fenceDeviceCreate;

const openTask = async () => {
  await page.goto(location.fenceDeviceList({ clusterName }));
  await open();
};

describe("Fence device create task", () => {
  afterEach(intercept.stop);

  it("should succesfully create new fence device", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.stonithAgentDescribeAgent({
          clusterName,
          agentName,
          agentData: responses.fenceAgentMetadata.ok,
        }),
        route.stonithCreate({
          clusterName,
          fenceDeviceName,
          agentName,
          instanceAttrs: { ip, username },
        }),
      ],
    });
    await openTask();
    await fillNameAndAgent(fenceDeviceName, agentName);
    await nextFrom("Name and type");
    await fillAttributes({ ip, username });
    await nextFrom("Instance attributes");
    await nextFrom("Settings");
    await assertReview({
      name: "F1",
      agentName: "fence_apc",
      instanceAttr_ip: "127.0.0.1",
    });
    await nextFrom("Review");
    await waitForSuccess();
  });
});
