import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import {CheckCircleIcon} from "@patternfly/react-icons";

import * as palette from "app/view/share/palette";

export const IssueListEmpty = () => {
  return (
    <EmptyState variant="small" style={{margin: "auto"}}>
      <EmptyStateIcon icon={CheckCircleIcon} color={palette.SUCCESS} />
      <Title size="lg" headingLevel="h3">
        No issues
      </Title>
      <EmptyStateBody>Pcsd has not detected any issue here</EmptyStateBody>
    </EmptyState>
  );
};
