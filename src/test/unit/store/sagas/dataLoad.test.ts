import { takeNewLoadings } from "app/store/sagas/common/dataLoad";
import { ActionLeaf } from "app/store";

const clusterName1 = "cluster-1";
const startActionClusterSync = (clusterName: string): ActionLeaf => ({
  type: "CLUSTER.STATUS.SYNC",
  key: { clusterName: clusterName },
});

const stopActionClusterSync = (clusterName: string): ActionLeaf => ({
  type: "CLUSTER.STATUS.SYNC.STOP",
  key: { clusterName: clusterName },
});

const stopSyncCluster = (clusterName: string) => ({
  specificator: `syncCluster:${clusterName}`,
  stop: stopActionClusterSync(clusterName),
});

const syncCluster = (clusterName: string) => ({
  specificator: `syncCluster:${clusterName}`,
  start: startActionClusterSync(clusterName),
  stop: stopActionClusterSync(clusterName),
});

const startDashboard: ActionLeaf = { type: "CLUSTER.LIST.SYNC" };
const stopDashboard: ActionLeaf = { type: "CLUSTER.LIST.SYNC.STOP" };

describe("takeNewLoading", () => {
  it("should return empty results when inputs empty", () => {
    expect(takeNewLoadings([], [])).toEqual({
      startActions: [],
      stopActions: [],
      nextStops: [],
    });
  });

  it("should add first loading", () => {
    expect(takeNewLoadings([syncCluster(clusterName1)], [])).toEqual({
      startActions: [startActionClusterSync(clusterName1)],
      stopActions: [],
      nextStops: [stopSyncCluster(clusterName1)],
    });
  });

  it("should remove existing stop when no new loading", () => {
    expect(takeNewLoadings([], [stopSyncCluster(clusterName1)])).toEqual({
      startActions: [],
      stopActions: [stopActionClusterSync(clusterName1)],
      nextStops: [],
    });
  });

  it("should remove what is not re-added", () => {
    const clusterName2 = "cluster-2";
    expect(
      takeNewLoadings(
        [
          syncCluster(clusterName2),
          {
            specificator: "syncDashboard",
            start: startDashboard,
            stop: stopDashboard,
          },
        ],
        [stopSyncCluster(clusterName1)],
      ),
    ).toEqual({
      startActions: [startActionClusterSync(clusterName2), startDashboard],
      stopActions: [stopActionClusterSync(clusterName1)],
      nextStops: [
        stopSyncCluster(clusterName2),
        {
          stop: stopDashboard,
          specificator: "syncDashboard",
        },
      ],
    });
  });
});
