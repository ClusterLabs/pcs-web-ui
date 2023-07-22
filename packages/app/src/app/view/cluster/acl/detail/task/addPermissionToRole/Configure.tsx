import {
  Add,
  Kind,
  PermissionsForm,
  Remove,
  Scope,
  ScopeType,
} from "app/view/cluster/acl/permissions";

import {useTask} from "./useTask";

export const Configure = () => {
  const {
    updatePermissions,
    state: {permissionInfoList, showValidationErrors},
  } = useTask();

  return (
    <PermissionsForm
      permissionList={permissionInfoList}
      scope={(permission, index) => (
        <Scope
          index={index}
          scope={permission[2]}
          showValidationErrors={showValidationErrors}
          updatePermissions={updatePermissions}
        />
      )}
      scopeType={(permission, index) => (
        <ScopeType
          index={index}
          scopeType={permission[1]}
          updatePermissions={updatePermissions}
        />
      )}
      kind={(permission, index) => (
        <Kind
          index={index}
          kind={permission[0]}
          updatePermissions={updatePermissions}
        />
      )}
      remove={(_, index) => (
        <Remove index={index} updatePermissions={updatePermissions} />
      )}
      add={<Add updatePermissions={updatePermissions} />}
    />
  );
};
