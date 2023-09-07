import {Button} from "@patternfly/react-core";
import {TrashIcon} from "@patternfly/react-icons";

import {UpdatePermissions} from "./types";

export const Remove = (props: {
  index: number;
  updatePermissions: UpdatePermissions;
  "data-test"?: string;
}) => {
  return (
    <Button
      variant="link"
      className="pf-u-m-0 pf-u-p-0"
      onClick={() =>
        props.updatePermissions(permissions =>
          permissions.filter((_, i) => i !== props.index),
        )
      }
      icon={<TrashIcon />}
      data-test={props["data-test"]}
    />
  );
};
