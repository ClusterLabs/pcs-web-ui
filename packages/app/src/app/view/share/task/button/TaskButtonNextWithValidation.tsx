import type React from "react";
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
  const {task} = useTaskContext();
  const dispatch = useDispatch();
  const {run, runIf, children, disabled} = props;
  return (
    <ButtonWithEnter
      onClick={() => {
        if (runIf || runIf === undefined) {
          dispatch({
            type: "TASK.VALIDATION.HIDE",
            key: {task},
          });
          run();
        } else {
          dispatch({
            type: "TASK.VALIDATION.SHOW",
            key: {task},
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
