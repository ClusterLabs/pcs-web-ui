import {useDispatch} from "app/view/share";

import {useTaskContext} from "./TaskContext";
import {TaskResultAction} from "./TaskResultAction";

export const TaskResultActionBackCluster = () => {
  const {clusterName, task} = useTaskContext();
  const dispatch = useDispatch();
  return (
    <TaskResultAction
      variant="secondary"
      label="Back to update settings"
      action={() => {
        dispatch({
          type: "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET",
          // ok, this component should be used only in the context of
          // a particular cluster, not dashboard
          key: {clusterName: clusterName ?? "", task},
        });
      }}
    />
  );
};
