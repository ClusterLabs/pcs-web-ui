import { Button } from "@patternfly/react-core";
import { PlusCircleIcon, TrashIcon } from "@patternfly/react-icons";

import { FormGroup, FormText } from "app/view/share";

import { PermissionListForWrite } from "./types";

export const PermissionAddForm = ({
  permissionList,
  update,
}: {
  permissionList: PermissionListForWrite;
  update: (_permissionList: PermissionListForWrite) => void;
}) => {
  return (
    <FormGroup label="Permissions" fieldId="role-permissions">
      <table>
        <tbody>
          {permissionList.map(([_permissionLevel, _scopeType, scope], i) => (
            <tr key={i}>
              <td className="pf-u-pr-sm pf-u-pb-sm">
                <FormText
                  id={`permission-name-${i}`}
                  value={scope}
                  onChange={value =>
                    update(
                      permissionList.map(
                        ([permissionLevel, scopeType, scope], index) =>
                          i === index
                            ? [permissionLevel, scopeType, value]
                            : [permissionLevel, scopeType, scope],
                      ),
                    )
                  }
                />
              </td>
              <td>
                <Button
                  variant="link"
                  className="pf-u-m-0 pf-u-p-0"
                  onClick={() =>
                    update(
                      permissionList.filter(
                        (_permission, index) => i !== index,
                      ),
                    )
                  }
                  icon={<TrashIcon />}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Button
        variant="primary"
        onClick={() => update([...permissionList, ["read", "id", ""]])}
        icon={<PlusCircleIcon />}
        className="pf-u-mt-sm"
      >
        Add permission
      </Button>
    </FormGroup>
  );
};
