import {
  TaskButtonResult,
  TaskFinishLibWizard,
  TaskSuccess,
  Wizard,
  WizardFooter,
} from "app/view/share";

import {useTask} from "./useTask";
import {EnterName} from "./EnterName";
import {Review} from "./Review";
import {Roles} from "./Roles";

export const AclSubjectCreate = () => {
  const {
    name: taskName,
    close,
    createSubject,
    isNameValid,
    state: {
      libCall: {response, reports},
      subjectType,
      subjectId,
    },
  } = useTask();

  const enterSubjectNameLabel = `Enter ${subjectType} name`;

  return (
    <Wizard
      task={taskName}
      taskLabel={`create ${subjectType} ${subjectId}`}
      data-test={`task-create-${subjectType}`}
      description={`Create ACL ${subjectType}`}
      onClose={close}
      steps={[
        {
          name: enterSubjectNameLabel,
          component: <EnterName />,
          footer: (
            <WizardFooter
              next={{actionIf: isNameValid}}
              back={{disabled: true}}
            />
          ),
        },
        {
          name: "Assign ACL roles",
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
                label: `Create ${subjectType}`,
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
              success={<TaskSuccess primaryAction={<TaskButtonResult />} />}
              backToUpdateSettingsStepName={enterSubjectNameLabel}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
