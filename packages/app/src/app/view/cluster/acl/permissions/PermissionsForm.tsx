import type React from "react";
import {Form} from "@patternfly/react-core";

import {FormGroup} from "app/view/share";

import type {PermissionListForWrite} from "../types";

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
        <table>
          <thead>
            <tr>
              <th className="pf-v5-u-pb-md">Scope Type</th>
              <th className="pf-v5-u-pb-md">Scope</th>
              <th className="pf-v5-u-pb-md">Kind</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {props.permissionList.map((permission, i) => (
              <tr key={i}>
                <td className="pf-v5-u-pr-sm pf-v5-u-pb-sm">
                  {props.scopeType(permission, i)}
                </td>
                <td className="pf-v5-u-pr-md pf-v5-u-pb-sm">
                  {props.scope(permission, i)}
                </td>
                <td className="pf-v5-u-pr-md pf-v5-u-pb-sm">
                  {props.kind(permission, i)}
                </td>
                <td className="pf-v5-u-pb-sm">{props.remove(permission, i)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {props.add}
      </FormGroup>
    </Form>
  );
};
