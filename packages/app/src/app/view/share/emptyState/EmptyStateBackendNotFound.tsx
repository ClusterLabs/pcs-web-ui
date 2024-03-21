import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  Title,
} from "@patternfly/react-core";

export const EmptyStateBackendNotFound = () => {
  return (
    <EmptyState style={{margin: "auto"}}>
      <Title size="lg" headingLevel="h2">
        Pcsd server (backend) not found.
      </Title>
      <EmptyStateBody>
        To use HA Cluster Management, make sure pcsd service is running.
      </EmptyStateBody>
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button
            variant="primary"
            onClick={() =>
              pcsUiEnvAdapter.jump("/system/services#/pcsd.service")
            }
          >
            Go to pcsd service settings.
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    </EmptyState>
  );
};
