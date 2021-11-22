import React from "react";
import { Button } from "@patternfly/react-core";

export const TaskButtonReviewAndFinish: React.FC<{
  onClick?: () => void;
  label?: string;
}> = ({ onClick = undefined, label = "Review and finish" }) => {
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
