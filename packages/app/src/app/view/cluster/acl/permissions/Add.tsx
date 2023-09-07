import {Button} from "@patternfly/react-core";
import {PlusCircleIcon} from "@patternfly/react-icons";

import {UpdatePermissions} from "./types";

export const Add = (props: {
  updatePermissions: UpdatePermissions;
  "data-test"?: string;
}) => {
  return (
    <Button
      variant="primary"
      onClick={() =>
        props.updatePermissions(permissions => [
          ...permissions,
          ["read", "id", ""],
        ])
      }
      icon={<PlusCircleIcon />}
      className="pf-u-mt-sm"
      data-test={props["data-test"]}
    >
      Add permission
    </Button>
  );
};
