import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {tabs, utilization} = marks.cluster.resources.currentPrimitive;

const resourceId = "A";
const util_1 = {id: "A_test_one", name: "test_one", value: "10"};
const util_2 = {id: "A_test_two", name: "test_two", value: "20"};

describe("Primitive meta attributes view", () => {
  it("should render meta attributes", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [
          cs.primitive(resourceId, {utilization: [util_1, util_2]}),
        ],
      }),
    });

    await goToPrimitive(resourceId);
    await click(tabs.utilization);

    await assert.countIs(utilization.pair, 2);
    await assert.nvPairIs(utilization.pair, util_1.name, util_1.value);
    await assert.nvPairIs(utilization.pair, util_2.name, util_2.value);
  });
});
