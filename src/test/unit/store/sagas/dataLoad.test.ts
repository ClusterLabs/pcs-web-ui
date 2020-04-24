import { takeNewLoadings } from "app/store/sagas/dataLoad";
import { LeafAction } from "app/actions";
import { expect } from "chai";

const clusterName1 = "cluster-1";
const startActionClusterSync = (clusterName: string): LeafAction => ({
  type: "CLUSTER_DATA.SYNC",
  payload: { clusterUrlName: clusterName },
});

const stopActionClusterSync = (clusterName: string): LeafAction => ({
  type: "CLUSTER_DATA.SYNC.STOP",
  payload: { clusterUrlName: clusterName },
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

const startDashboard: LeafAction = { type: "DASHBOARD_DATA.SYNC" };
const stopDashboard: LeafAction = { type: "DASHBOARD_DATA.SYNC.STOP" };

describe("takeNewLoading", () => {
  it("should return empty results when inputs empty", () => {
    expect(takeNewLoadings([], [])).eql({
      startActions: [],
      stopActions: [],
      nextStops: [],
    });
  });

  it("should add first loading", () => {
    expect(takeNewLoadings([syncCluster(clusterName1)], [])).eql({
      startActions: [startActionClusterSync(clusterName1)],
      stopActions: [],
      nextStops: [stopSyncCluster(clusterName1)],
    });
  });

  it("should remove existing stop when no new loading", () => {
    expect(takeNewLoadings([], [stopSyncCluster(clusterName1)])).eql({
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
    ).eql({
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
