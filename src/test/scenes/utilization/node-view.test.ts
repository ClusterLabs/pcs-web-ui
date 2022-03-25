import * as workflow from "test/workflow";
import { intercept } from "test/tools";

import {
  interceptWithUtilization,
  node1Utilization,
  openUtilizationTab,
} from "./node-common";

const { utilization } = workflow.cluster;

describe("Resource utilization detail", () => {
  afterEach(intercept.stop);
  it("should render utilization attributes", async () => {
    interceptWithUtilization();

    await openUtilizationTab();
    await utilization.assertDisplayedAre(node1Utilization);
  });
});
