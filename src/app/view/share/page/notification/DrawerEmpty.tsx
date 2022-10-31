import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import {SearchIcon} from "@patternfly/react-icons";

export const DrawerEmpty = () => {
  return (
    <EmptyState variant={EmptyStateVariant.full} data-test={"drawer-empty"}>
      <EmptyStateIcon icon={SearchIcon} />
      <Title headingLevel="h2" size="lg">
        No alerts found
      </Title>
      <EmptyStateBody>There are currently no alerts.</EmptyStateBody>
    </EmptyState>
  );
};
