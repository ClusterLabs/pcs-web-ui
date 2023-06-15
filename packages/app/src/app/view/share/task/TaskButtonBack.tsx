import {Button, WizardContextConsumer} from "@patternfly/react-core";

export const TaskButtonBack = ({
  onClick,
  dataTest,
  disabled = false,
}: {
  onClick?: () => void;
  disabled?: boolean;
  dataTest?: () => {"data-test": string};
}) => {
  return (
    <WizardContextConsumer>
      {({onBack}) => (
        <Button
          variant="secondary"
          onClick={onClick ?? onBack}
          className={disabled ? "pf-m-disabled" : ""}
          {...(dataTest ? dataTest() : {"data-test": "task-back"})}
        >
          Back
        </Button>
      )}
    </WizardContextConsumer>
  );
};
