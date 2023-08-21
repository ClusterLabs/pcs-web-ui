import * as responses from "dev/responses";
import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName, goToResources} from "./common";

const {resourceCreate: task} = marks.task;

const agent = responses.resourceAgentMetadata.ocfHeartbeatDummy;

const resourceId = "A";
const agentName = agent.name;

describe("Create resource task", () => {
  afterEach(mock.stop);
  beforeEach(async () => {
    await mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
      additionalRouteList: [
        mock.route.resourceAgentDescribeAgent({
          clusterName,
          agentName,
          agentData: agent,
        }),
        mock.route.resourceCreate({
          clusterName,
          resourceId,
          agentName,
          instanceAttrs: {},
        }),
      ],
    });
  });

  it("should successfully create new fence device", async () => {
    await goToResources();
    await click(marks.cluster.resourcesToolbar.createResource);
    await fill(task.nameType.name, resourceId);
    await select(task.nameType.agentName, agentName.split(":").at(-1));
    await click([
      task.nameTypeFooter.next,
      task.instanceAttrsFooter.next,
      task.settingsFooter.next,
    ]);
    await assert.textIs([
      [task.review.name, resourceId],
      [task.review.agentName, agentName],
    ]);
    await click(task.reviewFooter.next);
    await isVisible(task.success);
    await assert.countIs(task.report, 0);
  });
});
