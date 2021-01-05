import { DefaultRootState, useSelector } from "react-redux";

import { useSelectedClusterName } from "./SelectedClusterContext";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function useClusterSelector<
  A extends any[],
  S extends DefaultRootState,
  R,
>(
  selector: (clusterName: string, ...selectorArgs: A) => (state: S) => R,
  ...args: A
): [R, string] {
  const clusterName = useSelectedClusterName();
  return [useSelector(selector(clusterName, ...args)), clusterName];
}
