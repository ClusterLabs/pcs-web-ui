import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {item} = shortcuts.common;
const {tabs, utilization} = marks.cluster.resources.currentPrimitive;

const resourceId = "A";
const utilizationList = [
  {id: "A_test_one", name: "test_one", value: "10"},
  {id: "A_test_two", name: "test_two", value: "20"},
];

describe("Primitive meta attributes view", () => {
  it("should render meta attributes", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [
          cs.primitive(resourceId, {utilization: utilizationList}),
        ],
      }),
    });

    await goToPrimitive(resourceId);
    await click(tabs.utilization);

    await assert.countIs(utilization.pair, 2);
    await item(utilization.pair)
      .byKey(pair => pair.name, utilizationList[0].name)
      .thereIs(pair => pair.value, utilizationList[0].value);
    await item(utilization.pair)
      .byKey(pair => pair.name, utilizationList[1].name)
      .thereIs(pair => pair.value, utilizationList[1].value);
  });
});
