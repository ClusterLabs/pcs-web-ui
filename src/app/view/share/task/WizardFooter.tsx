import React from "react";
import { WizardContextConsumer } from "@patternfly/react-core";

import { TaskButtonNext } from "./TaskButtonNext";
import { TaskButtonBack } from "./TaskButtonBack";
import { TaskButtonCancel } from "./TaskButtonCancel";

export const WizardFooter: React.FC<{
  onClose: () => void;
  onNext?: () => void;
  preNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  nextLabel?: React.ComponentProps<typeof TaskButtonNext>["label"];
}> = ({
  onBack,
  onNext,
  preNext,
  onClose,
  nextLabel = "Next",
  backDisabled = false,
  nextDisabled = false,
}) => {
  return (
    <WizardContextConsumer>
      {({ onBack: pfOnBack, onNext: pfOnNext }) => (
        <>
          <TaskButtonNext
            onClick={() => {
              if (preNext) {
                preNext();
              }
              (onNext || pfOnNext)();
            }}
            disabled={nextDisabled}
            label={nextLabel}
          />
          <TaskButtonBack
            onClick={onBack || pfOnBack}
            disabled={backDisabled}
          />
          <TaskButtonCancel onClick={onClose} />
        </>
      )}
    </WizardContextConsumer>
  );
};
