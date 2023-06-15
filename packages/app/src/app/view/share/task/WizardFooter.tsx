import React from "react";

import {TaskButtonBack} from "./TaskButtonBack";
import {TaskButtonCancel} from "./TaskButtonCancel";
import {TaskButtonReviewAndFinish} from "./TaskButtonReviewAndFinish";
import {WizardFooterNext} from "./WizardFooterNext";
import {TaskFooter} from "./TaskFooter";

export const WizardFooter = (props: {
  backDisabled?: boolean;
  back?: Omit<React.ComponentProps<typeof TaskButtonBack>, "onClick">;
  next?: React.ComponentProps<typeof WizardFooterNext>;
  cancel?: Omit<React.ComponentProps<typeof TaskButtonCancel>, "onClick">;
  reviewAndFinish?: Omit<
    React.ComponentProps<typeof TaskButtonReviewAndFinish>,
    "onClick"
  >;
  "data-test"?: string;
}) => {
  return (
    <TaskFooter data-test={props["data-test"] ?? "footer"}>
      <WizardFooterNext {...(props.next ?? {})} />
      <TaskButtonBack {...(props.back ?? {})} />
      {props.reviewAndFinish !== undefined && (
        <TaskButtonReviewAndFinish {...(props.reviewAndFinish ?? {})} />
      )}
      <TaskButtonCancel {...(props.cancel ?? {})} />
    </TaskFooter>
  );
};
