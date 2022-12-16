import {intercept, shortcuts} from "test/tools";
import {cluster} from "test/workflow";

import {clusterStatus} from "./common";

const clusterName = clusterStatus.cluster_name;

const roleId = "first";

describe("ACL role add permission task", () => {
  afterEach(intercept.stop);
  it("should successfully add permissions to role", async () => {
    shortcuts.interceptWithCluster({
      clusterStatus,
      additionalRouteList: [],
    });
    await cluster.goTo({clusterName, tabName: "acl"});
    await page.click(cluster.acl.roleLinkSelector(roleId));
  });
});
