import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {clusterName, goToResources, openClone, openGroup} from "./common";
import {openPrimitive} from "./commonPrimitive";

const {resources, resourcesToolbar} = marks.cluster;

const resourceList = [
  cs.primitive("ResourceA", {
    agentname: "ocf:heartbeat:apache",
    provider: "heartbeat",
    class: "ocf",
    type: "apache",
  }),
  cs.group("Group1", [cs.primitive("ResourceB"), cs.primitive("ResourceC")]),
  cs.clone(
    "Clone1",
    cs.group("Group2", [cs.primitive("ResourceD"), cs.primitive("ResourceE")]),
  ),
  cs.clone("Clone2", cs.primitive("ResourceF")),
];

const primitiveItem = (id: string) =>
  item.byId(resources.tree.primitive, id, p => p.id);

const groupItem = (id: string) =>
  item.byId(resources.tree.group, id, g => g.id);

const cloneItem = (id: string) =>
  item.byId(resources.tree.clone, id, c => c.id);

const prepareCluster = () =>
  mock.shortcuts.withCluster({
    clusterStatus: cs.cluster(clusterName, "ok", {
      resource_list: resourceList,
    }),
  });

describe("Resource tree", () => {
  beforeEach(prepareCluster);
  afterEach(mock.stop);

  it("should show primitive resource detail", async () => {
    await goToResources();

    await openPrimitive("ResourceA");
    await isVisible(resources.currentPrimitive);
    await assert.textIs(resources.currentPrimitive.id, "ResourceA");
  });

  it("should show primitive group detail", async () => {
    await goToResources();

    await openGroup("Group1");
    await isVisible(resources.currentGroup);
    await assert.textIs(resources.currentGroup.id, "Group1");
  });

  it("should show primitive clone detail", async () => {
    await goToResources();

    await openClone("Clone1");
    await isVisible(resources.currentClone);
    await assert.textIs(resources.currentClone.id, "Clone1");
  });
});

describe("Resource tree filter", () => {
  beforeEach(prepareCluster);
  afterEach(mock.stop);
  it("should display only resourceA on filter 'resourcea'", async () => {
    await goToResources();
    await fill(
      resourcesToolbar.treeFilter.locator.locator("//input"),
      "resourcea",
    );
    await isVisible(primitiveItem("ResourceA"));
    await isAbsent(groupItem("Group1"));
    await isAbsent(primitiveItem("ResourceB"));
    await isAbsent(primitiveItem("ResourceC"));
    await isAbsent(cloneItem("Clone1"));
    await isAbsent(groupItem("Group2"));
    await isAbsent(primitiveItem("ResourceD"));
    await isAbsent(primitiveItem("ResourceE"));
    await isAbsent(cloneItem("Clone2"));
    await isAbsent(primitiveItem("ResourceF"));
  });
  it("should display only resource D and path to it", async () => {
    await goToResources();
    await fill(
      resourcesToolbar.treeFilter.locator.locator("//input"),
      "ResourceD",
    );
    await isAbsent(primitiveItem("ResourceA"));
    await isAbsent(groupItem("Group1"));
    await isAbsent(primitiveItem("ResourceB"));
    await isAbsent(primitiveItem("ResourceC"));
    await isVisible(cloneItem("Clone1"));
    await isVisible(groupItem("Group2"));
    await isVisible(primitiveItem("ResourceD"));
    await isAbsent(primitiveItem("ResourceE"));
    await isAbsent(cloneItem("Clone2"));
    await isAbsent(primitiveItem("ResourceF"));
  });
  it("should display only group Group1 + Group2 + path", async () => {
    await goToResources();
    await fill(resourcesToolbar.treeFilter.locator.locator("//input"), "Group");
    await isAbsent(primitiveItem("ResourceA"));
    await isVisible(groupItem("Group1"));
    await isAbsent(primitiveItem("ResourceB"));
    await isAbsent(primitiveItem("ResourceC"));
    await isVisible(cloneItem("Clone1"));
    await isVisible(groupItem("Group2"));
    await isAbsent(primitiveItem("ResourceD"));
    await isAbsent(primitiveItem("ResourceE"));
    await isAbsent(cloneItem("Clone2"));
    await isAbsent(primitiveItem("ResourceF"));
  });
  it("should display only resources with agent ...:apache ", async () => {
    await goToResources();
    await fill(resourcesToolbar.treeFilter.locator.locator("//input"), "apach");
    await isVisible(primitiveItem("ResourceA"));
    await isAbsent(groupItem("Group1"));
    await isAbsent(primitiveItem("ResourceB"));
    await isAbsent(primitiveItem("ResourceC"));
    await isAbsent(cloneItem("Clone1"));
    await isAbsent(groupItem("Group2"));
    await isAbsent(primitiveItem("ResourceD"));
    await isAbsent(primitiveItem("ResourceE"));
    await isAbsent(cloneItem("Clone2"));
    await isAbsent(primitiveItem("ResourceF"));
  });
});
