// Cluster status is pretty complex. Sometimes a discrepancy between frontend
// and backend appears. This modules collect tests for discovered cases.

import * as t from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const clusterName = "test-cluster";

// We want to see browser behavior with (for now) invalid status before fix. But
// the typecheck tell us that it is wrong and dev build fails. So, we decive it.
const deceiveTypeCheck = (maybeInvalidPart: ReturnType<typeof JSON.parse>) =>
  JSON.parse(JSON.stringify(maybeInvalidPart));

describe("Cluster with advanced status", () => {
  it("accept fence levels", async () => {
    mock.shortcuts.withCluster({
      clusterStatus: t.cluster(clusterName, "ok", {
        fence_levels: deceiveTypeCheck({
          "node-1": [
            {
              level: "1",
              devices: "fence-1",
            },
            {
              level: "2",
              devices: "fence-2",
            },
          ],
        }),
      }),
    });
    await goToCluster(clusterName);
    await isVisible(marks.cluster.overview);
  });
});
