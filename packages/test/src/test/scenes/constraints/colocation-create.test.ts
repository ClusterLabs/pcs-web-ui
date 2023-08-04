import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToConstraints, toolbar} from "./common";

const {select, radioGroup} = shortcuts.patternfly;

const resourceId = clusterStatus.resource_list[1].id;
const withResourceId = clusterStatus.resource_list[0].id;
const placement = "together";
const score = "100";

const {constraintColocationCreate: task} = marks.task;

describe("Create colocation counstraint", () => {
  afterEach(intercept.stop);
  it("should be done sucessfully", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        intercept.route.addConstraintRemote({
          clusterName: clusterStatus.cluster_name,
          constraint: {
            colocation: {
              resourceId,
              withResourceId,
              score,
            },
          },
        }),
      ],
    });
    await goToConstraints();
    await toolbar.launch(toolbar => toolbar.createColocation);

    await select(task.resource, resourceId);
    await select(task.withResource, withResourceId);
    await radioGroup(task.placement, placement);
    await fill(task.score, score);
    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
