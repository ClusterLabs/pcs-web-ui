import * as responses from "dev/responses";
import * as cs from "dev/responses/clusterStatus/tools";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.dashboard;
const {select} = shortcuts.patternfly;
const {expectReview, expectReports} = shortcuts.task;

const {resourceCreate} = marks.task;
const {review} = resourceCreate;

const agent = responses.resourceAgentMetadata.ocfHeartbeatDummy;

const resourceId = "A";
const clusterName = "test-cluster";
const agentName = agent.name;

const openTask = async () => {
  await click(marks.cluster.resourcesToolbar.createResource);
  await isVisible(resourceCreate);
};

describe("Create resource task", () => {
  afterEach(intercept.stop);
  beforeEach(async () => {
    await intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
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
  });

  it("should successfully create new fence device", async () => {
    await goToCluster(clusterName, tabs => tabs.resources);
    await openTask();
    await fill(resourceCreate.nameType.name, resourceId);
    await select(
      resourceCreate.nameType.agentName,
      agentName.split(":").at(-1),
    );
    await click(resourceCreate.nameTypeFooter.next);
    await click(resourceCreate.instanceAttrsFooter.next);
    await click(resourceCreate.settingsFooter.next);
    await expectReview([
      [review.name, resourceId],
      [review.agentName, agentName],
    ]);
    await click(resourceCreate.reviewFooter.next);
    await isVisible(resourceCreate.success);
    await expectReports(resourceCreate.report).count(0);
  });
});
