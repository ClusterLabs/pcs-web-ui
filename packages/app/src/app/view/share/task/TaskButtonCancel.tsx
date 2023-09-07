import {Button} from "@patternfly/react-core";

export const TaskButtonCancel = ({onClick}: {onClick: () => void}) => {
  return (
    <Button variant="link" onClick={onClick} data-test="task-cancel">
      Cancel
    </Button>
  );
};
