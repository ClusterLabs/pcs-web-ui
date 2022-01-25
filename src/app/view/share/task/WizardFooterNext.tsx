import React from "react";
import { WizardContext } from "@patternfly/react-core";

import { TaskButtonNext } from "./TaskButtonNext";
import { TaskButtonNextWithValidation } from "./TaskButtonNextWithValidation";

export const WizardFooterNext = (
  props: {
    disabled?: boolean;
    label?: React.ComponentProps<typeof TaskButtonNext>["label"];
  } & (
    | { preAction?: () => void }
    | { actionIf?: boolean }
    | { action?: () => void }
  ),
) => {
  const { onNext } = React.useContext(WizardContext);

  if ("actionIf" in props) {
    return (
      <TaskButtonNextWithValidation
        run={onNext}
        runIf={props.actionIf}
        label={props.label ?? "Next"}
        disabled={props.disabled ?? false}
      />
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
    <TaskButtonNext
      onClick={action}
      disabled={props.disabled ?? false}
      label={props.label ?? "Next"}
    />
  );
};
