import {TaskResultActionWizard} from "./TaskResultActionWizard";

export const TaskResultActionWizardTryAgain = (props: {
  stepName: string;
  "data-test": string;
}) => {
  return (
    <TaskResultActionWizard
      label="TryAgain"
      stepName={props.stepName}
      data-test={props["data-test"]}
    />
  );
};
