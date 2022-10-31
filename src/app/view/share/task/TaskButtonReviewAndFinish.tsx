import {Button} from "@patternfly/react-core";

export const TaskButtonReviewAndFinish = ({
  onClick = undefined,
  label = "Review and finish",
}: {
  onClick?: () => void;
  label?: string;
}) => {
  return (
    <Button
      variant="tertiary"
      type="submit"
      onClick={onClick}
      data-test="review-and-finish"
    >
      {label}
    </Button>
  );
};
