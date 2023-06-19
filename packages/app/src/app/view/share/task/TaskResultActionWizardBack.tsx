import {TaskResultActionWizard} from "./TaskResultActionWizard";

export const TaskResultActionWizardBack = (props: {
  stepName: string;
  "data-test": string;
}) => {
  return (
    <TaskResultActionWizard
      variant="primary"
      label="Back to update settings"
      stepName={props.stepName}
      data-test={props["data-test"]}
    />
  );
};
