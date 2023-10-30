import {useDispatch} from "app/view/share";
import {useClusterSources} from "app/view/cluster/share";

import {useTaskOpenClose} from "./useTaskOpenClose";

export function useClusterTask<
  NAME extends keyof ReturnType<typeof useClusterSources>["tasks"],
>(name: NAME) {
  const {
    tasks: {[name]: state},
  } = useClusterSources();

  const {clusterName} = state;
  const dispatch = useDispatch();
  const openClose = useTaskOpenClose(name, clusterName);

  return {
    name,
    state,
    ...openClose,
    clusterName,
    dispatch,
  };
}
