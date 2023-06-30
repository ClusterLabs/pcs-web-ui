import {Button} from "@patternfly/react-core";

import {ButtonWithEnter} from "app/view/share/ButtonWithEnter";

import {useTaskContext} from "./TaskContext";

export const TaskResultAction = (props: {
  variant?: "primary" | "secondary" | "link";
  action?: () => void;
  label?: string;
  "data-test"?: string;
}) => {
  const {close} = useTaskContext();

  const ButtonComponent =
    props.variant === "primary" ? ButtonWithEnter : Button;

  return (
    <ButtonComponent
      variant={props.variant ?? "primary"}
      onClick={props.action ?? close}
      data-test={props["data-test"] ?? "task-close"}
    >
      {props.label ?? "Close"}
    </ButtonComponent>
  );
};
