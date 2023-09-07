import {TaskButtonResultWizard} from "./TaskButtonResultWizard";

export const TaskButtonWizardResultBack = (props: {
  stepName: string;
  "data-test": string;
}) => {
  return (
    <TaskButtonResultWizard
      variant="primary"
      label="Back to update settings"
      stepName={props.stepName}
      data-test={props["data-test"]}
    />
  );
};
