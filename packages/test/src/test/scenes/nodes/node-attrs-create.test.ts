import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

import {clusterName, goToNode} from "./common";

const {tabs, attributes} = marks.cluster.nodes.currentNode;
const {nvsetEdit: task} = marks.task;

const nodeName = "node-1";
const attribute = {
  name: "node-attr1",
  value: "node-attr1-value",
};

describe("Node attributes create", () => {
  afterEach(mock.stop);

  it("should be done successfully", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
      additionalRouteList: [
        mock.route.addNodeAttrRemote({
          clusterName,
          nodeName,
          name: attribute.name,
          value: attribute.value,
        }),
      ],
    });

    await goToNode(nodeName);
    await click(tabs.attributes);
    await click(attributes.toolbar.create);

    await fill(task.name, attribute.name);
    await fill(task.value, attribute.value);

    await click(task.run);
    await isVisible(task.success);
    await click(task.success.close);
    await isAbsent(task);
  });

  it("should display error when occurred attr create fail", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok"),
      additionalRouteList: [
        mock.route.addNodeAttrRemote({
          clusterName,
          nodeName,
          name: attribute.name,
          value: attribute.value,
          response: {
            status: [
              400,
              `Unable to set attribute '${attribute.name}=${attribute.value}'` +
                ` for node "'${nodeName}': Some stderr...`,
            ],
          },
        }),
      ],
    });

    await goToNode(nodeName);
    await click(tabs.attributes);
    await click(attributes.toolbar.create);

    await fill(task.name, attribute.name);
    await fill(task.value, attribute.value);

    await click(task.run);
    await isVisible(task.fail);
    await click(task.fail.cancel);
    await isAbsent(task);
  });
});
