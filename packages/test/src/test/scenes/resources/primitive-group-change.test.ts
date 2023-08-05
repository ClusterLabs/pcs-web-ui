import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName} from "./common";
import {goToPrimitive, toolbar} from "./commonPrimitive";

const {select} = shortcuts.patternfly;

const {resourcePrimitiveGroupChange: task} = marks.task;

const groupId = "G1";
const adjacentResourceId = "B";
const resourceId = "C";

describe("Create location counstraint", () => {
  afterEach(intercept.stop);
  it("should be done sucessfully", async () => {
    intercept.shortcuts.interceptWithCluster({
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
        intercept.route.resourceChangeGroup({
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
    await toolbar.launch(toolbar => [
      toolbar.dropdown,
      toolbar.dropdown.changeGroup,
    ]);
    await select(task.targetGroup, groupId);
    await select(task.adjacentResource, adjacentResourceId);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });
});
