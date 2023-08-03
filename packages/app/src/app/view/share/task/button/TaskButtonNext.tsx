import {useDispatch} from "app/view/share/useDispatch";
import {ButtonWithEnter} from "app/view/share/ButtonWithEnter";

import {useTaskContext} from "../TaskContext";

export const TaskButtonNext = (props: {
  run: () => void;
  runIf?: boolean;
  children?: React.ReactNode;
  disabled?: boolean;
  "data-test"?: string;
}) => {
  // Empty cluster name means that it is not in the context of cluster - ie. it
  // is dashboard. To make actions usable for dashboard tasks the key
  // clusterName must be null (so it is not propagated into cluster tasks)
  const {task, clusterName} = useTaskContext();
  const dispatch = useDispatch();
  const {run, runIf, children, disabled} = props;
  return (
    <ButtonWithEnter
      onClick={() => {
        if (runIf || runIf === undefined) {
          dispatch({
            type: "TASK.VALIDATION.HIDE",
            key: {clusterName, task},
          });
          run();
        } else {
          dispatch({
            type: "TASK.VALIDATION.SHOW",
            key: {clusterName, task},
          });
        }
      }}
      isDisabled={disabled ?? false}
      data-test={props["data-test"] ?? "task-next"}
    >
      {children ?? "Next"}
    </ButtonWithEnter>
  );
};
