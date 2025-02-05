import {FormRadios} from "app/view/share";

import type {Permission, UpdatePermissions} from "./types";

export const ScopeType = (props: {
  index: number;
  scopeType: Permission[1];
  updatePermissions: UpdatePermissions;
  "data-test"?: string;
}) => {
  return (
    <FormRadios
      label=""
      id={`permission-type-${props.index}`}
      options={["id", "xpath"]}
      selected={props.scopeType}
      onChange={scopeType =>
        props.updatePermissions(permissions =>
          permissions.map((p, i) =>
            i === props.index ? [p[0], scopeType, p[2]] : p,
          ),
        )
      }
      data-test={props["data-test"]}
    />
  );
};
