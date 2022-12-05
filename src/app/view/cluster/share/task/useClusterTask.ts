import {useDispatch, useTaskOpenClose} from "app/view/share";
import {useClusterSources} from "app/view/cluster/share";

export function useClusterTask<
  NAME extends keyof ReturnType<typeof useClusterSources>["tasks"],
>(name: NAME) {
  const {
    tasks: {[name]: state},
    loadedCluster: {clusterName},
  } = useClusterSources();

  const dispatch = useDispatch();
  const openClose = useTaskOpenClose(name);

  return {
    name,
    state,
    ...openClose,
    clusterName,
    dispatch,
  };
}
