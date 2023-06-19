import {WizardContextConsumer} from "@patternfly/react-core";

import {TaskResultAction} from "./TaskResultAction";

export const TaskResultActionWizard = (props: {
  stepName: string;
  label: string;
  variant?: React.ComponentProps<typeof TaskResultAction>["variant"];
  "data-test": string;
}) => {
  return (
    <WizardContextConsumer>
      {({goToStepByName}) => (
        <TaskResultAction
          variant={props.variant ?? "secondary"}
          label={props.label}
          action={() => goToStepByName(props.stepName)}
          data-test={props["data-test"]}
        />
      )}
    </WizardContextConsumer>
  );
};
