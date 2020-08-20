import * as types from "app/store/types";

import { clusterStatusDefault } from "../reducer";

export function clusterSelector<
  Selected extends unknown,
  Args extends unknown[]
>(
  selector: (storageItem: types.clusterStorage.Item, ...args: Args) => Selected,
): (
  clusterName: string,
  ...args: Args
) => (state: types.RootState) => Selected {
  return (clusterName, ...args) => state =>
    selector(state.clusterStorage[clusterName], ...args);
}

export function clusterStatusSelector<
  Selected extends unknown,
  Args extends unknown[]
>(
  selector: (
    clusterState: types.cluster.ClusterStatus,
    ...args: Args
  ) => Selected,
): (
  clusterName: string,
  ...args: Args
) => (state: types.RootState) => Selected {
  return (clusterName, ...args) => state =>
    selector(
      state.clusterStorage[clusterName]?.clusterStatus?.clusterData
        ?? clusterStatusDefault,
      ...args,
    );
}
