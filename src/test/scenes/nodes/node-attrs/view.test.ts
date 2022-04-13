import * as workflow from "test/workflow";
import { intercept } from "test/tools";

import { interceptWithNodeAttrs, node1Attrs, openNodeAttrsTab } from "./common";

const { nvsets } = workflow.cluster;

describe("Node attributes view", () => {
  afterEach(intercept.stop);
  it("should render node attributes", async () => {
    interceptWithNodeAttrs();

    await openNodeAttrsTab();
    await nvsets.assertDisplayedAre(node1Attrs);
  });
});
