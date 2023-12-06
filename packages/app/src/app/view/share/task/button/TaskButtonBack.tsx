import {Button, useWizardContext} from "@patternfly/react-core";

export const TaskButtonBack = (props: {
  onClick?: () => void;
  disabled?: boolean;
  "data-test"?: string;
}) => {
  const {goToPrevStep} = useWizardContext();
  return (
    <Button
      variant="secondary"
      onClick={props.onClick ?? goToPrevStep}
      className={props.disabled ? "pf-m-disabled" : ""}
      data-test={props["data-test"] ?? "task-back"}
    >
      Back
    </Button>
  );
};
