import * as workflow from "test/workflow";
import {intercept} from "test/tools";

import {doInterception, openMetaAttrsTab, resourceA} from "./common";

const {nvsets} = workflow.cluster;

describe("Resource meta attributes detail", () => {
  afterEach(intercept.stop);
  it("should render meta attributes", async () => {
    doInterception();

    await openMetaAttrsTab();
    await nvsets.assertDisplayedAre(resourceA.meta_attr);
  });
});
