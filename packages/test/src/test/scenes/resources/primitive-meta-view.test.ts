import * as cs from "dev/responses/clusterStatus/tools";

import {intercept} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName} from "./common";
import {goToPrimitive} from "./commonPrimitive";

const {countIs} = shortcuts.expect;
const {item} = shortcuts.common;
const {tabs, meta} = marks.cluster.resources.currentPrimitive;

const resourceId = "A";
const metaAttrs = [
  {id: "A_meta_one", name: "meta_one", value: "10"},
  {id: "A_meta_two", name: "meta_two", value: "20"},
];

describe("Primitive meta attributes view", () => {
  it("should render meta attributes", async () => {
    intercept.shortcuts.interceptWithCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: [cs.primitive(resourceId, {meta_attr: metaAttrs})],
      }),
    });

    await goToPrimitive(resourceId);
    await click(tabs.meta);
    await countIs(meta.pair, 2);
    await item(meta.pair)
      .byKey(pair => pair.name, metaAttrs[0].name)
      .thereIs(pair => pair.value, metaAttrs[0].value);
  });
});
