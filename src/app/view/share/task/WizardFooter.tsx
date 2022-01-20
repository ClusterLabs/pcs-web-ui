import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { TaskButtonBack } from "./TaskButtonBack";
import { TaskButtonCancel } from "./TaskButtonCancel";
import { TaskButtonReviewAndFinish } from "./TaskButtonReviewAndFinish";
import { WizardFooterNext } from "./WizardFooterNext";

export const WizardFooter = (props: {
  onClose: () => void;
  onBack?: () => void;
  backDisabled?: boolean;
  next: React.ComponentProps<typeof WizardFooterNext>;
  reviewAndFinish?: {
    label: string;
  };
}) => {
  const { onBack, onClose, backDisabled = false } = props;

  return (
    <WizardContextConsumer>
      {({ onBack: pfOnBack, goToStepByName }) => (
        <>
          <WizardFooterNext {...props.next} />
          <TaskButtonBack
            onClick={onBack || pfOnBack}
            disabled={backDisabled}
          />
          {props.reviewAndFinish !== undefined && (
            <TaskButtonReviewAndFinish
              onClick={() => goToStepByName("Review")}
              label={props.reviewAndFinish.label}
            />
          )}
          <TaskButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
