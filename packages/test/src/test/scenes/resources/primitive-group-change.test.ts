import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {resourcePrimitiveGroupChange: task} = marks.task;

const groupId = "G1";
const adjacentResourceId = "B";
const resourceId = "C";

describe("Create location counstraint", () => {
  afterEach(mock.stop);
  it("should be done sucessfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [
          cs.group(groupId, [
            cs.primitive("A"),
            cs.primitive(adjacentResourceId),
          ]),
          cs.primitive(resourceId),
        ],
      }),
      additionalRouteList: [
        mock.route.resourceChangeGroup({
          resourceId,
          adjacentResourceId,
          groupId,
          oldGroupId: "",
          position: "after",
          clusterName,
        }),
      ],
    });
    await goToPrimitive(resourceId);
    await click([
      marks.cluster.resources.currentPrimitive.toolbar.dropdown,
      marks.cluster.resources.currentPrimitive.toolbar.dropdown.changeGroup,
    ]);
    await select(task.targetGroup, groupId);
    await select(task.adjacentResource, adjacentResourceId);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
