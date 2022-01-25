import { Button } from "@patternfly/react-core";

import { useRunOnEnter } from "./useRunOnEnter";

export const TaskButtonNext = ({
  onClick,
  label = "Next",
  disabled = false,
}: {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}) => {
  useRunOnEnter(onClick);
  return (
    <Button
      variant="primary"
      type="submit"
      onClick={onClick}
      className={disabled ? "pf-m-disabled" : ""}
      data-test="task-next"
    >
      {label}
    </Button>
  );
};
