import {ButtonWithEnter} from "app/view/share/ButtonWithEnter";

import {useTaskContext} from "./TaskContext";

export const TaskSuccessAction = (props: {
  variant?: "primary" | "secondary";
  action?: () => void;
  label?: string;
  "data-test"?: string;
}) => {
  const {close} = useTaskContext();
  return (
    <ButtonWithEnter
      variant={props.variant ?? "primary"}
      onClick={props.action ?? close}
      data-test={props["data-test"] ?? "task-close"}
    >
      {props.label ?? "Close"}
    </ButtonWithEnter>
  );
};
