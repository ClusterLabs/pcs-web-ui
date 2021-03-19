import { clusterStatusDefault } from "app/store/reducers";
import * as types from "app/store/types";

type ClusterStorageItem = types.clusterStorage.ClusterStorageItem;
type ClusterStatus = types.cluster.ClusterStatus;
type RootState = types.RootState;

export function clusterSelector<
  Selected extends unknown,
  Args extends unknown[],
>(
  selector: (storageItem: ClusterStorageItem, ...args: Args) => Selected,
): (clusterName: string, ...args: Args) => (state: RootState) => Selected {
  return (clusterName, ...args) => state =>
    selector(state.clusterStorage[clusterName], ...args);
}

export function clusterStatusSelector<
  Selected extends unknown,
  Args extends unknown[],
>(
  selector: (clusterState: ClusterStatus, ...args: Args) => Selected,
): (clusterName: string, ...args: Args) => (state: RootState) => Selected {
  return (clusterName, ...args) => state =>
    selector(
      state.clusterStorage[clusterName]?.clusterStatus?.clusterData
        ?? clusterStatusDefault,
      ...args,
    );
}
