import * as workflow from "test/workflow";
import { intercept } from "test/tools";

import {
  interceptWithUtilization,
  openUtilizationTab,
  resourceA,
} from "./resource-common";

const { resources } = workflow.cluster;

describe("Resource utilization detail", () => {
  afterEach(intercept.stop);
  it("should render utilization attributes", async () => {
    interceptWithUtilization();

    await openUtilizationTab();
    await resources.utilization.assertDisplayedAre(resourceA.utilization);
  });
});
