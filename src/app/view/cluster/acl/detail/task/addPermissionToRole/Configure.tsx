import { Form } from "@patternfly/react-core";

import { PermissionAddForm } from "app/view/cluster/acl/PermissionAddForm";

import { useTask } from "./useTask";

export const Configure = () => {
  const {
    updateState,
    state: { permissionInfoList },
  } = useTask();

  return (
    <Form>
      <PermissionAddForm
        permissionList={permissionInfoList}
        update={permissionList =>
          updateState({ permissionInfoList: permissionList })
        }
      />
    </Form>
  );
};
