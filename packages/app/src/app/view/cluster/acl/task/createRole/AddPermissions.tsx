import {testMarks} from "app/view/dataTest";
import {TaskLibStep} from "app/view/share";
import {
  Add,
  Kind,
  PermissionsForm,
  Remove,
  Scope,
  ScopeType,
} from "app/view/cluster/acl/permissions";

import {useTask} from "./useTask";

const {addPermissions} = testMarks.task.aclRoleCreate;

export const AddPermissions = () => {
  const {
    updatePermissions,
    state: {
      permissionInfoList,
      libCall: {reports},
      showValidationErrors,
    },
  } = useTask();

  return (
    <TaskLibStep
      title="Add permissions"
      reports={reports}
      {...addPermissions.mark}
    >
      <PermissionsForm
        permissionList={permissionInfoList}
        scope={(permission, index) => (
          <Scope
            index={index}
            scope={permission[2]}
            showValidationErrors={showValidationErrors}
            updatePermissions={updatePermissions}
            {...addPermissions.permission.scope.mark}
          />
        )}
        scopeType={(permission, index) => (
          <ScopeType
            index={index}
            scopeType={permission[1]}
            updatePermissions={updatePermissions}
            {...addPermissions.permission.scopeType.mark}
          />
        )}
        kind={(permission, index) => (
          <Kind
            index={index}
            kind={permission[0]}
            updatePermissions={updatePermissions}
            {...addPermissions.permission.kind.mark}
          />
        )}
        remove={(_, index) => (
          <Remove
            index={index}
            updatePermissions={updatePermissions}
            {...addPermissions.permission.remove.mark}
          />
        )}
        add={
          <Add
            updatePermissions={updatePermissions}
            {...addPermissions.add.mark}
          />
        }
        {...addPermissions.permission.mark}
      />
    </TaskLibStep>
  );
};
