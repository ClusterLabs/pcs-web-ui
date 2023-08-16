import * as responses from "dev/responses";
import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName, goToResources, toolbar} from "./common";

const {select} = shortcuts.patternfly;
const {expectReview, expectReports} = shortcuts.task;

const {resourceCreate} = marks.task;
const {review} = resourceCreate;

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
    await toolbar.launch(toolbar => toolbar.createResource);
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
