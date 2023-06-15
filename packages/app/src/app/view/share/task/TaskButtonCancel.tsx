import {Button} from "@patternfly/react-core";

import {useTaskContext} from "./TaskContext";

export const TaskButtonCancel = ({
  dataTest,
  onClick,
}: {
  onClick?: () => void;
  dataTest?: () => {"data-test": string};
}) => {
  const {close} = useTaskContext();
  return (
    <Button
      variant="link"
      onClick={onClick ?? close}
      {...(dataTest ? dataTest() : {"data-test": "task-cancel"})}
    >
      Cancel
    </Button>
  );
};
