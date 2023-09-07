import {TaskButtonResultWizard as TaskButtonWizardResult} from "./TaskButtonResultWizard";

export const TaskResultActionWizardTryAgain = (props: {
  stepName: string;
  "data-test": string;
}) => {
  return (
    <TaskButtonWizardResult
      label="TryAgain"
      stepName={props.stepName}
      data-test={props["data-test"]}
    />
  );
};
