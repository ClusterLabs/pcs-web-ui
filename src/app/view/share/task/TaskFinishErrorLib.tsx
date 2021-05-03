import React from "react";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateSecondaryActions,
  Title,
} from "@patternfly/react-core";
import { ExclamationCircleIcon } from "@patternfly/react-icons/dist/js/icons";

import * as pallete from "app/view/share/pallete";

export const TaskFinishErrorLib: React.FC<{
  title: React.ReactNode;
  tryAgain: () => void;
  close: () => void;
}> = ({ title, tryAgain, close }) => {
  return (
    <EmptyState>
      <EmptyStateIcon icon={ExclamationCircleIcon} color={pallete.ERROR} />
      <Title headingLevel="h4" size="lg">
        {title}
      </Title>
      <EmptyStateBody>
        A communication error occurred during the operation (details in the
        browser console). You can try to perform the operation again.
      </EmptyStateBody>
      <Button variant="primary" onClick={tryAgain}>
        Try again
      </Button>
      <EmptyStateSecondaryActions>
        <Button variant="link" onClick={close}>
          Cancel
        </Button>
      </EmptyStateSecondaryActions>
    </EmptyState>
  );
};
