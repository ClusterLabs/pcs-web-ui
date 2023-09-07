import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {tabs, meta} = marks.cluster.resources.currentPrimitive;
const {nvsetEdit: task} = marks.task;

const resourceId = "A";
const metaAttr = {
  name: "meta_one",
  value: "10",
};

describe("Primitive meta attributes create", () => {
  afterEach(mock.stop);

  it("should be done successfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [cs.primitive(resourceId)],
      }),
      additionalRouteList: [
        mock.route.addMetaAttrRemote({
          clusterName,
          resourceId: resourceId,
          name: metaAttr.name,
          value: metaAttr.value,
        }),
      ],
    });

    await goToPrimitive(resourceId);
    await click(tabs.meta);
    await click(meta.toolbar.create);

    await fill(task.name, metaAttr.name);
    await fill(task.value, metaAttr.value);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should display error when occurred meta attr create", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [cs.primitive(resourceId)],
      }),
      additionalRouteList: [
        mock.route.addMetaAttrRemote({
          clusterName,
          resourceId: resourceId,
          name: metaAttr.name,
          value: metaAttr.value,
          response: {
            status: [
              400,
              `Unable to set meta attribute '${metaAttr.name}=${metaAttr.value}'`
                + ` for resource "'${resourceId}': Some stderr...`,
            ],
          },
        }),
      ],
    });

    await goToPrimitive(resourceId);
    await click(tabs.meta);
    await click(meta.toolbar.create);

    await fill(task.name, metaAttr.name);
    await fill(task.value, metaAttr.value);

    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
