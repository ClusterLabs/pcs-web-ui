import {
  TaskFinishLibWizard,
  TaskResultAction,
  TaskSuccess,
  Wizard,
  WizardFooter,
} from "app/view/share";

import {useTask} from "./useTask";
import {RoleName} from "./RoleName";
import {AddPermissions} from "./AddPermissions";
import {Review} from "./Review";

export const Task = () => {
  const {
    clusterName,
    close,
    aclRoleCreate,
    isNameValid,
    invalidPermissionIndexes,
    state: {
      roleId,
      libCall: {response, reports},
    },
  } = useTask();
  const taskLabel = `create acl role ${roleId}`;
  return (
    <Wizard
      task="aclRoleCreate"
      clusterName={clusterName}
      taskLabel={taskLabel}
      data-test="task-create-role"
      description="Create acl role"
      onClose={close}
      steps={[
        {
          name: "Enter role name",
          component: <RoleName />,
          footer: (
            <WizardFooter
              next={{actionIf: isNameValid}}
              back={{disabled: true}}
            />
          ),
        },
        {
          name: "Specify permissions",
          component: <AddPermissions />,
          canJumpTo: isNameValid,
          footer: (
            <WizardFooter
              next={{
                actionIf: isNameValid && invalidPermissionIndexes.length === 0,
              }}
            />
          ),
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => aclRoleCreate(),
                label: "Create role",
              }}
            />
          ),
          canJumpTo: isNameValid && invalidPermissionIndexes.length === 0,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              success={<TaskSuccess primaryAction={<TaskResultAction />} />}
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
