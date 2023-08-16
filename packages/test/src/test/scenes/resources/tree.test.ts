import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";
import * as shortcuts from "test/shortcuts";

import {clusterName, goToResources} from "./common";
import {openPrimitive} from "./commonPrimitive";

const {item} = shortcuts.common;
const {textIs} = shortcuts.expect;

const {resources} = marks.cluster;

const resourceList = [
  cs.primitive("A"),
  cs.group("G1", [cs.primitive("B"), cs.primitive("C")]),
  cs.clone("C1", cs.group("G2", [cs.primitive("D"), cs.primitive("E")])),
  cs.clone("C2", cs.primitive("F")),
];

const primitiveItem = (id: string) =>
  item(resources.tree.primitive)
    .byKey(resources.tree.primitive.id, id)
    .locator(primitive => primitive.id);

const groupItem = (id: string) =>
  item(resources.tree.group)
    .byKey(resources.tree.group.id, id)
    .locator(group => group.id);

const groupToggle = async (id: string) =>
  await click(
    item(resources.tree.group)
      .byKey(resources.tree.group.id, id)
      .locator(group => group.toggle),
  );

const openGroup = async (id: string) => {
  await click(groupItem(id));
};

const cloneItem = (id: string) =>
  item(resources.tree.clone)
    .byKey(resources.tree.clone.id, id)
    .locator(clone => clone.id);

const cloneToggle = async (id: string) =>
  await click(
    item(resources.tree.clone)
      .byKey(resources.tree.clone.id, id)
      .locator(clone => clone.toggle),
  );

const openClone = async (id: string) => {
  await click(cloneItem(id));
};

describe("Resource tree", () => {
  beforeEach(() =>
    mock.shortcuts.withCluster({
      clusterStatus: cs.cluster(clusterName, "ok", {
        resource_list: resourceList,
      }),
    }),
  );
  afterEach(mock.stop);

  it("should show unexpanded resource tree", async () => {
    await goToResources();

    await isVisible(primitiveItem("A"));
    await isVisible(groupItem("G1"));
    await isVisible(cloneItem("C1"));
    await isVisible(cloneItem("C2"));

    await isAbsent(primitiveItem("B"));
    await isAbsent(primitiveItem("C"));
    await isAbsent(primitiveItem("D"));
    await isAbsent(primitiveItem("E"));
    await isAbsent(primitiveItem("F"));
    await isAbsent(groupItem("G2"));
  });

  it("should show expanded group", async () => {
    await goToResources();

    await isAbsent(primitiveItem("B"));
    await isAbsent(primitiveItem("C"));

    await groupToggle("G1");
    await isVisible(primitiveItem("B"));
    await isVisible(primitiveItem("C"));

    await groupToggle("G1");
    await isAbsent(primitiveItem("B"));
    await isAbsent(primitiveItem("C"));
  });

  it("should show expanded clone with group", async () => {
    await goToResources();

    await isAbsent(groupItem("G2"));
    await isAbsent(primitiveItem("D"));
    await isAbsent(primitiveItem("E"));

    await cloneToggle("C1");
    await isVisible(groupItem("G2"));
    await isAbsent(primitiveItem("D"));
    await isAbsent(primitiveItem("E"));

    await groupToggle("G2");
    await isVisible(primitiveItem("D"));
    await isVisible(primitiveItem("E"));

    await cloneToggle("C1");
    await isAbsent(groupItem("G2"));
    await isAbsent(primitiveItem("D"));
    await isAbsent(primitiveItem("E"));
  });

  it("should show primitive resource detail", async () => {
    await goToResources();

    await openPrimitive("A");
    await isVisible(resources.currentPrimitive);
    await textIs(resources.currentPrimitive.id, "A");
  });

  it("should show primitive group detail", async () => {
    await goToResources();

    await openGroup("G1");
    await isVisible(resources.currentGroup);
    await textIs(resources.currentGroup.id, "G1");
  });

  it("should show primitive clone detail", async () => {
    await goToResources();

    await openClone("C1");
    await isVisible(resources.currentClone);
    await textIs(resources.currentClone.id, "C1");
  });
});
