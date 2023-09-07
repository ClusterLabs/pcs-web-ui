import React from "react";

import {
  TaskButtonBack,
  TaskButtonCancel,
  TaskButtonReviewAndFinish,
} from "./button";
import {TaskButtonWizardNext} from "./button";
import {TaskFooter} from "./TaskFooter";

export const WizardFooter = (props: {
  backDisabled?: boolean;
  back?: Omit<React.ComponentProps<typeof TaskButtonBack>, "onClick">;
  next?: React.ComponentProps<typeof TaskButtonWizardNext>;
  cancel?: Omit<React.ComponentProps<typeof TaskButtonCancel>, "onClick">;
  reviewAndFinish?: Omit<
    React.ComponentProps<typeof TaskButtonReviewAndFinish>,
    "onClick"
  >;
  "data-test"?: string;
}) => {
  return (
    <TaskFooter data-test={props["data-test"] ?? "footer"}>
      <TaskButtonWizardNext {...(props.next ?? {})} />
      <TaskButtonBack {...(props.back ?? {})} />
      {props.reviewAndFinish !== undefined && (
        <TaskButtonReviewAndFinish {...(props.reviewAndFinish ?? {})} />
      )}
      <TaskButtonCancel {...(props.cancel ?? {})} />
    </TaskFooter>
  );
};
