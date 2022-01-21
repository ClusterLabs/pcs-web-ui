import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { TaskButtonBack } from "./TaskButtonBack";
import { TaskButtonCancel } from "./TaskButtonCancel";
import { TaskButtonReviewAndFinish } from "./TaskButtonReviewAndFinish";
import { WizardFooterNext } from "./WizardFooterNext";
import { useWizardContext } from "./WizardContext";

export const WizardFooter = (props: {
  backDisabled?: boolean;
  back?: {
    disabled?: boolean;
  };
  next?: React.ComponentProps<typeof WizardFooterNext>;
  reviewAndFinish?: {
    label: string;
  };
}) => {
  const { close } = useWizardContext();

  return (
    <WizardContextConsumer>
      {({ onBack, goToStepByName }) => (
        <>
          <WizardFooterNext {...(props.next ?? {})} />
          <TaskButtonBack
            onClick={onBack}
            disabled={props.back?.disabled ?? false}
          />
          {props.reviewAndFinish !== undefined && (
            <TaskButtonReviewAndFinish
              onClick={() => goToStepByName("Review")}
              label={props.reviewAndFinish.label}
            />
          )}
          <TaskButtonCancel onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
