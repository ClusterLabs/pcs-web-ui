import { Button } from "@patternfly/react-core";

export const TaskButtonBack = ({
  onClick,
  disabled = false,
}: {
  onClick: () => void;
  disabled?: boolean;
}) => {
  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={disabled ? "pf-m-disabled" : ""}
      data-test="task-back"
    >
      Back
    </Button>
  );
};
