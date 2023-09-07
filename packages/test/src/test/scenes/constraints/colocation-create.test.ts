import {mock} from "test/tools";

import {clusterStatus, goToConstraints} from "./common";

const resourceId = clusterStatus.resource_list[1].id;
const withResourceId = clusterStatus.resource_list[0].id;
const placement = "together";
const score = "100";

const {constraintColocationCreate: task} = marks.task;

describe("Create colocation counstraint", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.addConstraintRemote({
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
    await click(marks.cluster.constraintsToolbar.createColocation);

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
