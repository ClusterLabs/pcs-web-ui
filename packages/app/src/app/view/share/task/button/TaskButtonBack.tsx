import {Button} from "@patternfly/react-core";
import {WizardContextConsumer} from "@patternfly/react-core/deprecated";

export const TaskButtonBack = (props: {
  onClick?: () => void;
  disabled?: boolean;
  "data-test"?: string;
}) => {
  return (
    <WizardContextConsumer>
      {({onBack}) => (
        <Button
          variant="secondary"
          onClick={props.onClick ?? onBack}
          className={props.disabled ? "pf-m-disabled" : ""}
          data-test={props["data-test"] ?? "task-back"}
        >
          Back
        </Button>
      )}
    </WizardContextConsumer>
  );
};
