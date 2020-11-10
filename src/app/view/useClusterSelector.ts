import { DefaultRootState, useSelector } from "react-redux";

import { useSelectedClusterName } from "./SelectedClusterContext";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function useClusterSelector<
  A extends any[],
  S extends DefaultRootState,
  R,
>(
  selector: (clusterUrlName: string, ...selectorArgs: A) => (state: S) => R,
  ...args: A
): [R, string] {
  const clusterUrlName = useSelectedClusterName();
  return [useSelector(selector(clusterUrlName, ...args)), clusterUrlName];
}
