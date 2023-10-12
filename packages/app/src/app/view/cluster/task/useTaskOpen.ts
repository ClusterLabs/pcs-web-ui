import {Action, ClusterTasks} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";
import {useClusterSources} from "app/view/cluster/share";

export const useTaskOpen = () => {
  const {
    loadedCluster: {clusterName},
  } = useClusterSources();

  const dispatch = useDispatch();

  return (taskKey: ClusterTasks[number], initAction?: Action) => {
    dispatch({
      type: "TASK.CLUSTER.OPEN",
      key: {clusterName},
      payload: {taskKey},
    });
    if (initAction) {
      dispatch(initAction);
    }
  };
};
