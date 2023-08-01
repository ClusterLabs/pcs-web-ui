import * as responses from "dev/responses";
import * as cs from "dev/responses/clusterStatus/tools";

import {intercept, route} from "test/tools";
import * as shortcuts from "test/shortcuts";

const {goToCluster} = shortcuts.dashboard;
const {select} = shortcuts.patternfly;
const {expectReview, expectReports} = shortcuts.task;

const {createResource} = app.task;
const {review} = createResource;

const agent = responses.resourceAgentMetadata.ocfHeartbeatDummy;

const resourceId = "A";
const clusterName = "test-cluster";
const agentName = agent.name;

const openTask = async () => {
  await click(app.clusterDetail.resourcesToolbar.createResource);
  await isVisible(createResource);
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
    await fill(createResource.nameType.name, resourceId);
    await select(
      createResource.nameType.agentName,
      agentName.split(":").at(-1),
    );
    await click(createResource.nameTypeFooter.next);
    await click(createResource.instanceAttrsFooter.next);
    await click(createResource.settingsFooter.next);
    await expectReview([
      [review.name, resourceId],
      [review.agentName, agentName],
    ]);
    await click(createResource.reviewFooter.next);
    await isVisible(createResource.success);
    await expectReports(createResource.report).count(0);
  });
});
