import {assert, mock} from "test/tools";
import * as t from "dev/responses/clusterStatus/tools";

const clusterName = "test-cluster";
const batchLimit = "2";
const clusterStatus = t.cluster(clusterName, "ok", {
  cluster_settings: {"batch-limit": batchLimit},
});

describe("Cluster properties display", () => {
  afterEach(mock.stop);
  it("should display batch limit", async () => {
    mock.shortcuts.withCluster({clusterStatus});
    await goToCluster(clusterStatus.cluster_name, tabs => tabs.properties);

    await assert.textIs(
      item.byKey(
        marks.cluster.properties.property,
        p => p.name,
        "Batch Limit",
        p => p.value,
      ),

      batchLimit,
    );
  });
});
