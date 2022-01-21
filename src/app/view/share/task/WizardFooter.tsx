import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { TaskButtonBack } from "./TaskButtonBack";
import { TaskButtonCancel } from "./TaskButtonCancel";
import { TaskButtonReviewAndFinish } from "./TaskButtonReviewAndFinish";
import { WizardFooterNext } from "./WizardFooterNext";
import { useWizardContext } from "./WizardContext";

export const WizardFooter = (props: {
  onBack?: () => void;
  backDisabled?: boolean;
  next?: React.ComponentProps<typeof WizardFooterNext>;
  reviewAndFinish?: {
    label: string;
  };
}) => {
  const { onBack, backDisabled = false } = props;
  const { close } = useWizardContext();

  return (
    <WizardContextConsumer>
      {({ onBack: pfOnBack, goToStepByName }) => (
        <>
          <WizardFooterNext {...(props.next ?? {})} />
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
          <TaskButtonCancel onClick={close} />
        </>
      )}
    </WizardContextConsumer>
  );
};
