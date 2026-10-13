import type {ClusterData, Root} from "../types";

export type ClusterSelector<ARGS extends unknown[], SELECTED> = (
  ..._args: ARGS
) => (_state: Root) => SELECTED;

export function clusterDataSelector<ARGS extends unknown[], SELECTED>(
  selector: (_clusterData: ClusterData, ..._args: ARGS) => SELECTED,
): ClusterSelector<ARGS, SELECTED> {
  return (...args) =>
    state =>
      selector(state.clusterData, ...args);
}
