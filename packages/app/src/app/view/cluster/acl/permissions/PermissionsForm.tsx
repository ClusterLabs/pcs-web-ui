import {Form} from "@patternfly/react-core";

import {FormGroup} from "app/view/share";

import {PermissionListForWrite} from "../types";

type ItemComponent = (
  permission: PermissionListForWrite[number],
  i: number,
) => React.ReactNode;

export const PermissionsForm = (props: {
  permissionList: PermissionListForWrite;
  scope: ItemComponent;
  scopeType: ItemComponent;
  kind: ItemComponent;
  remove: ItemComponent;
  add: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <Form data-test={props["data-test"]}>
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
            {props.permissionList.map((permission, i) => (
              <tr key={i} data-test={`permission-${i}`}>
                <td className="pf-u-pr-sm pf-u-pb-sm">
                  {props.scopeType(permission, i)}
                </td>
                <td className="pf-u-pr-md pf-u-pb-sm">
                  {props.scope(permission, i)}
                </td>
                <td className="pf-u-pr-md pf-u-pb-sm">
                  {props.kind(permission, i)}
                </td>
                <td className="pf-u-pb-sm">{props.remove(permission, i)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {props.add}
      </FormGroup>
    </Form>
  );
};
