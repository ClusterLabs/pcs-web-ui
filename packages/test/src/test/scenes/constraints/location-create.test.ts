import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterStatus, goToConstraints, toolbar} from "./common";

const {select, radioGroup} = shortcuts.patternfly;

const resourceId = clusterStatus.resource_list[1].id;
const nodeName = clusterStatus.node_list[1].name;
const resourceSpecification = "resource";
const preference = "Prefer";
const score = "100";

const {constraintLocationCreate: task} = marks.task;

describe("Create location counstraint", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus,
      additionalRouteList: [
        mock.route.addConstraintRemote({
          clusterName: clusterStatus.cluster_name,
          constraint: {
            location: {
              resourceSpecification,
              resourceValue: resourceId,
              nodeName,
              score,
            },
          },
        }),
      ],
    });
    await goToConstraints();
    await toolbar.launch(toolbar => toolbar.createLocation);

    await select(task.target.resource, resourceId);
    await select(task.location.node, nodeName);

    await radioGroup(task.preference, preference);
    await fill(task.score, score);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
