import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {tabs, meta} = marks.cluster.resources.currentPrimitive;

const resourceId = "A";
const meta_1 = {id: "A_meta_one", name: "meta_one", value: "10"};
const meta_2 = {id: "A_meta_two", name: "meta_two", value: "20"};

describe("Primitive meta attributes view", () => {
  it("should render meta attributes", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [
          cs.primitive(resourceId, {meta_attr: [meta_1, meta_2]}),
        ],
      }),
    });

    await goToPrimitive(resourceId);
    await click(tabs.meta);
    await assert.countIs(meta.pair, 2);
    await assert.nvPairIs(meta.pair, meta_1.name, meta_1.value);
    await assert.nvPairIs(meta.pair, meta_2.name, meta_2.value);
  });
});
