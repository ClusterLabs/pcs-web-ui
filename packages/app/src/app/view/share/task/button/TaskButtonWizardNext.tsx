import React from "react";
import {WizardContext} from "@patternfly/react-core";

import {ButtonWithEnter} from "app/view/share/ButtonWithEnter";

import {TaskButtonNext} from "./TaskButtonNext";

export const TaskButtonWizardNext = (
  props: {
    disabled?: boolean;
    label?: React.ComponentProps<typeof ButtonWithEnter>["children"];
    "data-test"?: string;
  } & ({preAction?: () => void} | {actionIf?: boolean} | {action?: () => void}),
) => {
  const {onNext} = React.useContext(WizardContext);

  if ("actionIf" in props) {
    return (
      <TaskButtonNext
        run={onNext}
        runIf={props.actionIf}
        disabled={props.disabled ?? false}
        data-test={props["data-test"]}
      >
        {props.label ?? "Next"}
      </TaskButtonNext>
    );
  }

  let action;
  if ("action" in props && props.action) {
    action = props.action;
  } else {
    action = () => {
      if ("preAction" in props && props.preAction) {
        props.preAction();
      }
      onNext();
    };
  }

  return (
    <ButtonWithEnter
      onClick={action}
      isDisabled={props.disabled ?? false}
      data-test={props["data-test"] ?? "task-next"}
    >
      {props.label ?? "Next"}
    </ButtonWithEnter>
  );
};
