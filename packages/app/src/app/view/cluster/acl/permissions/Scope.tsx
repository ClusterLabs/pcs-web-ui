import {FormText} from "app/view/share";

import {Permission, UpdatePermissions} from "./types";

export const Scope = (props: {
  index: number;
  scope: Permission[2];
  showValidationErrors: boolean;
  updatePermissions: UpdatePermissions;
  "data-test"?: string;
}) => {
  return (
    <FormText
      id={`permission-scope-${props.index}`}
      value={props.scope}
      isRequired
      showValidationErrors={props.showValidationErrors}
      isValid={props.scope.length > 0}
      helperTextInvalid="Please enter a value"
      onChange={scope =>
        props.updatePermissions(permissions =>
          permissions.map((p, i) =>
            props.index === i ? [p[0], p[1], scope] : p,
          ),
        )
      }
      data-test={props["data-test"]}
    />
  );
};
