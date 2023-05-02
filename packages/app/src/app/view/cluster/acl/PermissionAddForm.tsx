import {Button, Form} from "@patternfly/react-core";
import {PlusCircleIcon, TrashIcon} from "@patternfly/react-icons";

import {FormGroup, FormRadios, FormText} from "app/view/share";

import {PermissionListForWrite} from "./types";

export const getInvalidPermissionIndexes = (
  permissionList: PermissionListForWrite,
) =>
  permissionList.reduce<number[]>(
    (indexes, permission, i) => [
      ...indexes,
      ...(permission[2].length > 0 ? [] : [i]),
    ],
    [],
  );

export const PermissionAddForm = ({
  permissionList,
  update,
  invalidPermissionIndexes,
  showValidationErrors,
}: {
  permissionList: PermissionListForWrite;
  update: (_permissionList: PermissionListForWrite) => void;
  invalidPermissionIndexes: number[];
  showValidationErrors: boolean;
}) => {
  return (
    <Form>
      <FormGroup label="" fieldId="role-permissions">
        <table data-test="permission-list">
          <thead>
            <tr>
              <th className="pf-u-pb-md">Scope Type</th>
              <th className="pf-u-pb-md">Scope</th>
              <th className="pf-u-pb-md">Kind</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {permissionList.map(([kind, scopeType, scope], i) => (
              <tr key={i} data-test={`permission-${i}`}>
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
                    data-test="scope-type"
                  />
                </td>
                <td className="pf-u-pr-md pf-u-pb-sm">
                  <FormText
                    id={`permission-name-${i}`}
                    value={scope}
                    isRequired
                    showValidationErrors={showValidationErrors}
                    isValid={!invalidPermissionIndexes.includes(i)}
                    helperTextInvalid="Please enter a value"
                    onChange={value =>
                      update(
                        permissionList.map((permission, pi) =>
                          i === pi
                            ? [permission[0], permission[1], value]
                            : permission,
                        ),
                      )
                    }
                    data-test="scope"
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
                    data-test="kind"
                  />
                </td>
                <td className="pf-u-pb-sm">
                  <Button
                    variant="link"
                    className="pf-u-m-0 pf-u-p-0"
                    onClick={() =>
                      update(
                        permissionList.filter((_permission, pi) => i !== pi),
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
          data-test="permission-add"
        >
          Add permission
        </Button>
      </FormGroup>
    </Form>
  );
};
