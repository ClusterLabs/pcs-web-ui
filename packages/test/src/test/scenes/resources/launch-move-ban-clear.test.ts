import * as cs from "dev/responses/clusterStatus/tools";

import {assert, mock} from "test/tools";

import {goToResources, openClone, openGroup} from "./common";
import {openPrimitive} from "./commonPrimitive";

const clusterStatus = cs.cluster("test-cluster", "ok", {
  resource_list: [
    cs.primitive("A"),
    cs.group("G1", [cs.primitive("G1_A"), cs.primitive("G1_B")]),
    cs.clone("CL1", cs.primitive("CL1_A")),
    cs.clone(
      "CL2",
      cs.group("G2", [cs.primitive("G2_A"), cs.primitive("G2_B")]),
    ),
  ],
});

const resourceMoveTitleIs = async (title: string) => {
  await assert.textIs(taskTitle(marks.task.resourceMove), title);
};

const resourceBanTitleIs = async (title: string) => {
  await assert.textIs(taskTitle(marks.task.resourceBan), title);
};

const resourceClearTitleIs = async (title: string) => {
  await assert.textIs(taskTitle(marks.task.resourceClear), title);
};

beforeEach(async () => {
  mock.shortcuts.withCluster({clusterStatus});
  await goToResources();
});

afterEach(mock.stop);

describe("Primitive resource move launch", () => {
  const runMovePrimitive = async () => {
    await click([
      marks.cluster.resources.currentPrimitive.toolbar.dropdown,
      marks.cluster.resources.currentPrimitive.toolbar.dropdown.move,
    ]);
  };

  it("should launch primitive move", async () => {
    await openPrimitive("A");
    await runMovePrimitive();

    await resourceMoveTitleIs("Move primitive resource A");
  });

  it("should launch group move inside group", async () => {
    await openPrimitive("G1_A");
    await runMovePrimitive();

    await appConfirm.run("Cannot move primitive resource");
    await resourceMoveTitleIs("Move group G1");
  });

  it("should launch clone move inside clone", async () => {
    await openPrimitive("CL1_A");
    await runMovePrimitive();

    await appConfirm.run("Cannot move primitive resource");
    await resourceMoveTitleIs("Move clone CL1");
  });

  it("should launch clone move inside clonned group", async () => {
    await openPrimitive("G2_A");
    await runMovePrimitive();

    await appConfirm.run("Cannot move primitive resource");
    await resourceMoveTitleIs("Move clone CL2");
  });
});

describe("Primitive resource ban launch", () => {
  const runBanPrimitive = async () => {
    await click([
      marks.cluster.resources.currentPrimitive.toolbar.dropdown,
      marks.cluster.resources.currentPrimitive.toolbar.dropdown.ban,
    ]);
  };

  it("should launch primitive ban", async () => {
    await openPrimitive("A");
    await runBanPrimitive();

    await resourceBanTitleIs("Ban primitive resource A");
  });

  it("should launch group ban inside group", async () => {
    await openPrimitive("G1_A");
    await runBanPrimitive();

    await appConfirm.run("Cannot ban primitive resource");
    await resourceBanTitleIs("Ban group G1");
  });

  it("should launch clone ban inside clone", async () => {
    await openPrimitive("CL1_A");
    await runBanPrimitive();

    await appConfirm.run("Cannot ban primitive resource");
    await resourceBanTitleIs("Ban clone CL1");
  });

  it("should launch clone ban inside clonned group", async () => {
    await openPrimitive("G2_A");
    await runBanPrimitive();

    await appConfirm.run("Cannot ban primitive resource");
    await resourceBanTitleIs("Ban clone CL2");
  });
});

describe("Group move launch", () => {
  const runMoveGroup = async () => {
    await click([marks.cluster.resources.currentGroup.toolbar.move]);
  };

  it("should launch group move", async () => {
    await openGroup("G1");
    await runMoveGroup();

    await resourceMoveTitleIs("Move group G1");
  });

  it("should launch clone move inside clonned group", async () => {
    await openGroup("G2");
    await runMoveGroup();

    await appConfirm.run("Cannot move group");
    await resourceMoveTitleIs("Move clone CL2");
  });
});

describe("Group ban launch", () => {
  const runBanGroup = async () => {
    await click([
      marks.cluster.resources.currentGroup.toolbar.dropdown,
      marks.cluster.resources.currentGroup.toolbar.dropdown.ban,
    ]);
  };

  it("should launch group ban", async () => {
    await openGroup("G1");
    await runBanGroup();

    await resourceBanTitleIs("Ban group G1");
  });

  it("should launch clone ban inside clonned group", async () => {
    await openGroup("G2");
    await runBanGroup();

    await appConfirm.run("Cannot ban group");
    await resourceBanTitleIs("Ban clone CL2");
  });
});

describe("Clone move launch", () => {
  const runMoveClone = async () => {
    await click([marks.cluster.resources.currentClone.toolbar.move]);
  };

  it("should launch clone move", async () => {
    await openClone("CL1");
    await runMoveClone();

    await resourceMoveTitleIs("Move clone CL1");
  });
});

describe("Clone ban launch", () => {
  const runBanClone = async () => {
    await click([marks.cluster.resources.currentClone.toolbar.ban]);
  };

  it("should launch clone ban", async () => {
    await openClone("CL1");
    await runBanClone();

    await resourceBanTitleIs("Ban clone CL1");
  });
});

describe("Clear launch", () => {
  it("should launch primitive clear", async () => {
    await openPrimitive("A");
    await click([
      marks.cluster.resources.currentPrimitive.toolbar.dropdown,
      marks.cluster.resources.currentPrimitive.toolbar.dropdown.clear,
    ]);

    await resourceClearTitleIs("Clear primitive resource A");
  });

  it("should launch group clear", async () => {
    await openGroup("G1");
    await click([
      marks.cluster.resources.currentGroup.toolbar.dropdown,
      marks.cluster.resources.currentGroup.toolbar.dropdown.clear,
    ]);

    await resourceClearTitleIs("Clear group G1");
  });

  it("should launch clone clear", async () => {
    await openClone("CL1");
    await click([
      marks.cluster.resources.currentClone.toolbar.dropdown,
      marks.cluster.resources.currentClone.toolbar.dropdown.clear,
    ]);

    await resourceClearTitleIs("Clear clone CL1");
  });
});
