import { useSelector } from "react-redux";

import { selectors } from "app/store";

import { useSelectedClusterName } from "./SelectedClusterContext";

export function useClusterSelector<ARGS extends unknown[], SELECTED_TYPE>(
  selector: selectors.ClusterSelector<ARGS, SELECTED_TYPE>,
  ...args: ARGS
): [SELECTED_TYPE, string] {
  const clusterName = useSelectedClusterName();
  return [useSelector(selector(clusterName, ...args)), clusterName];
}
