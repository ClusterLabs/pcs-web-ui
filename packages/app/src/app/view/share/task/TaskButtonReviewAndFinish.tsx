import {Button, WizardContextConsumer} from "@patternfly/react-core";

export const TaskButtonReviewAndFinish = ({
  onClick = undefined,
  label = "Review and finish",
  dataTest,
}: {
  onClick?: () => void;
  label?: string;
  dataTest?: () => {"data-test": string};
}) => {
  return (
    <WizardContextConsumer>
      {({goToStepByName}) => (
        <Button
          variant="tertiary"
          type="submit"
          onClick={onClick ?? (() => goToStepByName("Review"))}
          {...(dataTest ? dataTest() : {"data-test": "review-and-finish"})}
        >
          {label}
        </Button>
      )}
    </WizardContextConsumer>
  );
};
