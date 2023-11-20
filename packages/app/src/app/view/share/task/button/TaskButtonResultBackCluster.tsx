import {useDispatch} from "app/view/share";

import {useTaskContext} from "../TaskContext";

import {TaskButtonResult} from "./TaskButtonResult";

export const TaskButtonResultnBackCluster = () => {
  const {task} = useTaskContext();
  const dispatch = useDispatch();
  return (
    <TaskButtonResult
      variant="secondary"
      label="Back to update settings"
      action={() => {
        dispatch({
          type: "LIB.CALL.CLUSTER.TASK.RESPONSE.RESET",
          // ok, this component should be used only in the context of
          // a particular cluster, not dashboard
          key: {task},
        });
      }}
    />
  );
};
