import {TaskFinishLibWizard, Wizard, WizardFooter} from "app/view/share";

import {useTask} from "./useTask";
import {RoleName} from "./RoleName";
import {AddPermissions} from "./AddPermissions";
import {Review} from "./Review";

export const Task = () => {
  const {
    close,
    aclRoleCreate,
    isNameValid,
    invalidPermissionIndexes,
    state: {
      roleId,
      libCall: {response, reports},
    },
  } = useTask();
  return (
    <Wizard
      task="aclRoleCreate"
      title="Create role"
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
              taskName={`create acl role ${roleId}`}
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
