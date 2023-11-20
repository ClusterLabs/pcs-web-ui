import {testMarks} from "app/view/dataTest";
import {
  Add,
  Kind,
  PermissionsForm,
  Remove,
  Scope,
  ScopeType,
} from "app/view/cluster/acl/permissions";

import {useTask} from "./useTask";

const {permission, add} = testMarks.task.aclRoleAddPermission;

export const Configure = () => {
  const {
    updatePermissions,
    state: {permissionInfoList, showValidationErrors},
  } = useTask();

  return (
    <PermissionsForm
      permissionList={permissionInfoList}
      scope={(p, index) => (
        <Scope
          index={index}
          scope={p[2]}
          showValidationErrors={showValidationErrors}
          updatePermissions={updatePermissions}
          {...permission.scope.mark}
        />
      )}
      scopeType={(p, index) => (
        <ScopeType
          index={index}
          scopeType={p[1]}
          updatePermissions={updatePermissions}
          {...permission.scopeType.mark}
        />
      )}
      kind={(p, index) => (
        <Kind
          index={index}
          kind={p[0]}
          updatePermissions={updatePermissions}
          {...permission.kind.mark}
        />
      )}
      remove={(_, index) => (
        <Remove
          index={index}
          updatePermissions={updatePermissions}
          {...permission.remove.mark}
        />
      )}
      add={<Add updatePermissions={updatePermissions} {...add.mark} />}
      {...permission.mark}
    />
  );
};
