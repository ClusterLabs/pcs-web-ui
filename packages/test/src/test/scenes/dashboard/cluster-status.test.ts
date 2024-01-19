import * as cs from "dev/responses/clusterStatus/tools";

import {mock} from "test/tools";

const mockClusterStatus = ({
  nodeStatus,
  nodeQuorum,
}: {
  nodeStatus: "standby" | "online" | "offline";
  nodeQuorum: boolean;
}) => {
  mock.shortcuts.withDashboard({
    clusterStatus: [
      cs.cluster("test-cluster", "ok", {
        node_list: [
          cs.node("1", {
            status: nodeStatus,
            quorum: nodeQuorum,
          }),
        ],
      }),
    ],
  });
};

const statusLabel = (label: "running" | "inoperative") =>
  marks.dashboard.clusterList.cluster.status.locator.locator(
    `xpath=//*[text() = "${label}"]`,
  );

describe("Cluster brief status based on nodes status and quorum", () => {
  afterEach(mock.stop);

  it("should be running when node is online and with quorum", async () => {
    mockClusterStatus({nodeStatus: "online", nodeQuorum: true});
    await goToDashboard();
    await isVisible(statusLabel("running"));
  });

  it("should be inoperative when node is standby and with quorum", async () => {
    mockClusterStatus({nodeStatus: "standby", nodeQuorum: true});
    await goToDashboard();
    await isVisible(statusLabel("inoperative"));
  });
});
