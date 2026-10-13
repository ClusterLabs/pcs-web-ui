import type {ClusterData, Root} from "../types";

export type ClusterSelector<ARGS extends unknown[], SELECTED> = (
  _clusterName: string,
  ..._args: ARGS
) => (_state: Root) => SELECTED;

export function clusterDataSelector<ARGS extends unknown[], SELECTED>(
  selector: (_clusterData: ClusterData, ..._args: ARGS) => SELECTED,
): ClusterSelector<ARGS, SELECTED> {
  // Single-cluster model: the clusterName argument is kept for signature
  // compatibility (the view still passes it) but ignored.
  return (_clusterName, ...args) =>
    state =>
      selector(state.clusterData, ...args);
}
