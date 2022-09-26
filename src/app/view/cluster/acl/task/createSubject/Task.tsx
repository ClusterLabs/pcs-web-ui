import { TaskFinishLibWizard, Wizard, WizardFooter } from "app/view/share";

import { useTask } from "./useTask";
import { EnterName } from "./EnterName";
import { Review } from "./Review";
import { Roles } from "./Roles";

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
      description={`Create acl ${subjectType}`}
      onClose={close}
      steps={[
        {
          name: `Enter ${subjectType} name`,
          component: <EnterName />,
          footer: (
            <WizardFooter
              next={{ actionIf: isNameValid }}
              back={{ disabled: true }}
            />
          ),
        },
        {
          name: "Assign acl roles",
          component: <Roles />,
          canJumpTo: isNameValid,
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
              backToUpdateSettingsStepName={`Enter ${subjectType} name`}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
