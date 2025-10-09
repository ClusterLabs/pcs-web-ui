import {testMarks} from "app/view/dataTest";
import {
  TaskButtonResult,
  TaskButtonResultCancel,
  TaskButtonWizardResultBack,
  TaskFinishError,
  TaskProgress,
  TaskSuccess,
} from "app/view/share";

import {useTask} from "./useTask";
import {Alert} from "@patternfly/react-core";

const {success, unsuccess} = testMarks.task.propertiesUpdate;

export const Result = ({
  backStep,
  taskLabel,
}: {
  backStep: string;
  taskLabel: string;
}) => {
  const {
    state: {response, resultMessage, isForceable},
    propertiesUpdate,
  } = useTask();

  switch (response) {
    case "ok":
      return (
        <TaskSuccess
          primaryAction={<TaskButtonResult {...success.close.mark} />}
          {...success.mark}
        />
      );
    case "fail":
      return (
        <TaskFinishError
          title={`Task "${taskLabel}" failed`}
          message={
            <Alert
              variant="danger"
              isInline
              title={
                "Operation has not completed successfully. " +
                "You can return back, change settings and try again. " +
                "Or you can proceed anyway with the current settings since" +
                " error can be overridden"
              }
            >
              {resultMessage}
            </Alert>
          }
          primaryAction={
            <TaskButtonWizardResultBack
              stepName={backStep}
              {...unsuccess.back.mark}
            />
          }
          secondaryActions={
            <>
              <TaskButtonResult
                variant="secondary"
                label={isForceable ? "Proceed anyway" : "Try again"}
                action={() => propertiesUpdate({force: isForceable})}
                {...unsuccess.tryAgain.mark}
              />
              <TaskButtonResultCancel {...unsuccess.cancel.mark} />
            </>
          }
          {...unsuccess.mark}
        />
      );

    default:
      return <TaskProgress title={`Processing task "${taskLabel}".`} />;
  }
};
