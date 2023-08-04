import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToConstraints, toolbar} from "./common";

const {select, radioGroup} = shortcuts.patternfly;

const resourceId = clusterStatus.resource_list[0].id;
const otherResourceId = clusterStatus.resource_list[1].id;
const score = "100";
const action = "promote";
const otherAction = "stop";
const order = "after";

const {constraintOrderCreate: task} = marks.task;

describe("Create order counstraint", () => {
  afterEach(intercept.stop);
  it("should be done sucessfully", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [
        intercept.route.addConstraintRemote({
          clusterName: clusterStatus.cluster_name,
          constraint: {
            order: {
              resourceId,
              action,
              otherResourceId,
              otherAction,
              order,
              score,
            },
          },
        }),
      ],
    });
    await goToConstraints();
    await toolbar.launch(toolbar => toolbar.createOrder);

    await select(task.first.resource, resourceId);
    await radioGroup(task.first.action, action);
    await select(task.then.resource, otherResourceId);
    await radioGroup(task.then.action, otherAction);
    await fill(task.score, score);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
