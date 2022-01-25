import { useDispatch } from "app/view/share/useDispatch";
import { useSelectedClusterName } from "app/view/share/SelectedClusterContext";

import { TaskButtonNext } from "./TaskButtonNext";
import { useTaskContext } from "./TaskContext";

export const TaskButtonNextWithValidation = ({
  run,
  runIf,
  label = "Next",
  disabled = false,
}: {
  run: () => void;
  runIf?: boolean;
  label?: string;
  disabled?: boolean;
}) => {
  // Empty cluster name means that it is not in the context of cluster - ie. it
  // is dashboard. To make actions usable for dashboard tasks the key
  // clusterName must be null (so it is not propagated into cluster tasks)
  const selectedClusterName = useSelectedClusterName();
  const clusterName =
    selectedClusterName.length > 0 ? selectedClusterName : null;
  const { task } = useTaskContext();
  const dispatch = useDispatch();
  return (
    <TaskButtonNext
      onClick={() => {
        if (runIf) {
          dispatch({
            type: "TASK.VALIDATION.HIDE",
            key: { clusterName, task },
          });
          run();
        } else {
          dispatch({
            type: "TASK.VALIDATION.SHOW",
            key: { clusterName, task },
          });
        }
      }}
      disabled={disabled ?? false}
      label={label ?? "Next"}
    />
  );
};
