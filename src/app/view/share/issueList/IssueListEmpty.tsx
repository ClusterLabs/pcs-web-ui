import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {CheckCircleIcon} from "@patternfly/react-icons";

import * as pallete from "app/view/share/pallete";

export const IssueListEmpty = () => {
  return (
    <EmptyState
      variant="small"
      data-test="issues-status"
      style={{margin: "auto"}}
    >
      <EmptyStateIcon icon={CheckCircleIcon} color={pallete.SUCCESS} />
      <Title size="lg" headingLevel="h3">
        No issues
      </Title>
      <EmptyStateBody>Pcsd has not detected any issue here</EmptyStateBody>
    </EmptyState>
  );
};
