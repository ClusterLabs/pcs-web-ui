import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName, goToResources, openClone, openGroup} from "./common";
import {openPrimitive} from "./commonPrimitive";

const {resources} = marks.cluster;

const resourceList = [
  cs.primitive("A"),
  cs.group("G1", [cs.primitive("B"), cs.primitive("C")]),
  cs.clone("C1", cs.group("G2", [cs.primitive("D"), cs.primitive("E")])),
  cs.clone("C2", cs.primitive("F")),
];

describe("Resource tree", () => {
  beforeEach(() =>
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: resourceList,
      }),
    }),
  );
  afterEach(mock.stop);

  it("should show primitive resource detail", async () => {
    await goToResources();

    await openPrimitive("A");
    await isVisible(resources.currentPrimitive);
    await assert.textIs(resources.currentPrimitive.id, "A");
  });

  it("should show primitive group detail", async () => {
    await goToResources();

    await openGroup("G1");
    await isVisible(resources.currentGroup);
    await assert.textIs(resources.currentGroup.id, "G1");
  });

  it("should show primitive clone detail", async () => {
    await goToResources();

    await openClone("C1");
    await isVisible(resources.currentClone);
    await assert.textIs(resources.currentClone.id, "C1");
  });
});
