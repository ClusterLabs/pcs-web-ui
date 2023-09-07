import * as responses from "dev/responses";

import {intercept, location, route, shortcuts} from "test/tools";
import * as workflow from "test/workflow";

const agent = responses.resourceAgentMetadata.ocfHeartbeatDummy;

const resourceId = "A";
const clusterName = "actions";
const agentName = agent.name;

const {fillNameAndAgent, nextFrom, open, waitForSuccess} =
  workflow.task.resourceCreate;

const openTask = async () => {
  await page.goto(location.resourceList({clusterName}));
  await open();
};

describe("Resource create task", () => {
  afterEach(intercept.stop);

  it("should successfully create new resource", async () => {
    shortcuts.interceptWithCluster({
      clusterName,
      additionalRouteList: [
        route.resourceAgentDescribeAgent({
          clusterName,
          agentName,
          agentData: agent,
        }),
        route.resourceCreate({
          clusterName,
          resourceId,
          agentName,
          instanceAttrs: {},
        }),
      ],
    });
    await openTask();
    await fillNameAndAgent(resourceId, "Dummy");
    await nextFrom("Name and type");
    await nextFrom("Instance attributes");
    await nextFrom("Settings");
    await nextFrom("Review");
    await waitForSuccess();
  });
});
