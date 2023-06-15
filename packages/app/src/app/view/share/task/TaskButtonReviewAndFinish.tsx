import {Button, WizardContextConsumer} from "@patternfly/react-core";

export const TaskButtonReviewAndFinish = (props: {
  onClick?: () => void;
  label?: string;
  "data-test"?: string;
}) => {
  return (
    <WizardContextConsumer>
      {({goToStepByName}) => (
        <Button
          variant="tertiary"
          type="submit"
          onClick={props.onClick ?? (() => goToStepByName("Review"))}
          data-test={props["data-test"] ?? "review-and-finish"}
        >
          {props.label ?? "Review and finish"}
        </Button>
      )}
    </WizardContextConsumer>
  );
};
