import {FormRadios} from "app/view/share";

import {Permission, UpdatePermissions} from "./types";

export const Kind = (props: {
  index: number;
  kind: Permission[0];
  updatePermissions: UpdatePermissions;
  "data-test"?: string;
}) => {
  return (
    <FormRadios
      label=""
      id={`permission-kind-${props.index}`}
      options={["read", "write", "deny"]}
      selected={props.kind}
      onChange={kind =>
        props.updatePermissions(permissions =>
          permissions.map((p, i) =>
            i === props.index ? [kind, p[1], p[2]] : p,
          ),
        )
      }
      data-test={props["data-test"]}
    />
  );
};
