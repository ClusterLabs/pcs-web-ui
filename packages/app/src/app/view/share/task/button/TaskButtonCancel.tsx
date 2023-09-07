import {Button} from "@patternfly/react-core";

import {useTaskContext} from "../TaskContext";

export const TaskButtonCancel = (props: {
  onClick?: () => void;
  "data-test"?: string;
}) => {
  const {close} = useTaskContext();
  return (
    <Button
      variant="link"
      onClick={props.onClick ?? close}
      data-test={props["data-test"] ?? "task-cancel"}
    >
      Cancel
    </Button>
  );
};
