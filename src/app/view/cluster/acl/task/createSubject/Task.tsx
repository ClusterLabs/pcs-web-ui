import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { useTask } from "./useTask";
import { Configure } from "./Configure";
import { Review } from "./Review";

export const Task = () => {
  const {
    name: taskName,
    close,
    createSubject,
    isNameValid,
    state: {
      libCall: { response, reports },
      subjectType,
      subjectId,
    },
  } = useTask();

  return (
    <Wizard
      task={taskName}
      title={`Create ${subjectType}`}
      data-test={`task-create-${subjectType}`}
      description="Create acl role"
      onClose={close}
      steps={[
        {
          name: `Enter ${subjectType} name`,
          component: <Configure />,
          footer: (
            <WizardFooter
              next={{ actionIf: isNameValid }}
              back={{ disabled: true }}
            />
          ),
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => createSubject(),
                label: "Create role",
              }}
            />
          ),
          canJumpTo: isNameValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName={`create ${subjectType} ${subjectId}`}
              backToUpdateSettingsStepName="Enter role name"
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
