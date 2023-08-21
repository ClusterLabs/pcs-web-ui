import {mock} from "test/tools";

import {clusterStatus, goToConstraints} from "./common";

const resourceId = clusterStatus.resource_list[0].id;
const otherResourceId = clusterStatus.resource_list[1].id;
const score = "100";
const action = "promote";
const otherAction = "stop";
const order = "after";

const {constraintOrderCreate: task} = marks.task;

describe("Create order counstraint", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.addConstraintRemote({
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
    await click(marks.cluster.constraintsToolbar.createOrder);

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
