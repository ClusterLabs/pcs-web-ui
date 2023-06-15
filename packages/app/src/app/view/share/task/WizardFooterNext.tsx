import React from "react";
import {WizardContext} from "@patternfly/react-core";

import {ButtonWithEnter} from "app/view/share/ButtonWithEnter";

import {TaskButtonNextWithValidation} from "./TaskButtonNextWithValidation";

export const WizardFooterNext = (
  props: {
    disabled?: boolean;
    label?: React.ComponentProps<typeof ButtonWithEnter>["children"];
    dataTest?: () => {"data-test": string};
  } & ({preAction?: () => void} | {actionIf?: boolean} | {action?: () => void}),
) => {
  const {onNext} = React.useContext(WizardContext);

  if ("actionIf" in props) {
    return (
      <TaskButtonNextWithValidation
        run={onNext}
        runIf={props.actionIf}
        disabled={props.disabled ?? false}
        dataTest={props.dataTest}
      >
        {props.label ?? "Next"}
      </TaskButtonNextWithValidation>
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
      {...(props.dataTest ? props.dataTest() : {"data-test": "task-next"})}
    >
      {props.label ?? "Next"}
    </ButtonWithEnter>
  );
};
