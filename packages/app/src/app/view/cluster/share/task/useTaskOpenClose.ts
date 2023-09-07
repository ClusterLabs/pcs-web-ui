import {useSelector} from "react-redux";

import {selectors} from "app/store";
import {useDispatch} from "app/view/share/useDispatch";

export const useTaskOpenClose = (taskKey: string, clusterName: string) => {
  const dispatch = useDispatch();
  const currentTaskKey = useSelector(
    selectors.getCurrentClusterTaskKey(clusterName),
  );
  return {
    open: () =>
      dispatch({
        type: "TASK.CLUSTER.OPEN",
        key: {clusterName},
        payload: {taskKey},
      }),
    close: () =>
      dispatch({
        type: "TASK.CLUSTER.CLOSE",
        key: {clusterName},
      }),
    isOpened: currentTaskKey === taskKey,
  };
};
