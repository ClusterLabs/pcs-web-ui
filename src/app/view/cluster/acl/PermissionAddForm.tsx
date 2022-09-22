import { Button } from "@patternfly/react-core";
import { PlusCircleIcon, TrashIcon } from "@patternfly/react-icons";

import { FormGroup, FormRadios, FormText } from "app/view/share";

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
        <thead>
          <tr>
            <th>Scope Type</th>
            <th>Scope</th>
            <th>Kind</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {permissionList.map(([kind, scopeType, scope], i) => (
            <tr key={i}>
              <td className="pf-u-pr-sm pf-u-pb-sm">
                <FormRadios
                  label=""
                  id={`permission-type-${i}`}
                  options={["id", "xpath"]}
                  selected={scopeType}
                  onChange={value =>
                    update(
                      permissionList.map((permission, pi) =>
                        i === pi
                          ? [permission[0], value, permission[2]]
                          : permission,
                      ),
                    )
                  }
                  data-test="type"
                />
              </td>
              <td className="pf-u-pr-md pf-u-pb-sm">
                <FormText
                  id={`permission-name-${i}`}
                  value={scope}
                  onChange={value =>
                    update(
                      permissionList.map((permission, pi) =>
                        i === pi
                          ? [permission[0], permission[1], value]
                          : permission,
                      ),
                    )
                  }
                />
              </td>
              <td className="pf-u-pr-md pf-u-pb-sm">
                <FormRadios
                  label=""
                  id={`permission-kind-${i}`}
                  options={["read", "write", "deny"]}
                  selected={kind}
                  onChange={value =>
                    update(
                      permissionList.map((permission, pi) =>
                        i === pi
                          ? [value, permission[1], permission[2]]
                          : permission,
                      ),
                    )
                  }
                  data-test="type"
                />
              </td>
              <td className="pf-u-pb-sm">
                <Button
                  variant="link"
                  className="pf-u-m-0 pf-u-p-0"
                  onClick={() =>
                    update(permissionList.filter((_permission, pi) => i !== pi))
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
