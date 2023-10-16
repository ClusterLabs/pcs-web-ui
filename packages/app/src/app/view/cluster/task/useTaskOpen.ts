import {Action} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";
import {useClusterSources} from "app/view/cluster/share";

export const useOpenTask = (clusterName: string) => {
  const dispatch = useDispatch();

  return (
    taskKey: keyof ReturnType<typeof useClusterSources>["tasks"],
    initAction?: Action,
  ) => {
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
