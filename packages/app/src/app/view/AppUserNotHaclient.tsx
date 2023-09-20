import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  PageSection,
  Title,
} from "@patternfly/react-core";
import {LockIcon} from "@patternfly/react-icons";

import {Page} from "app/view/share";

export const AppUserNotHaclient = () => {
  return (
    <Page>
      {_notifications => (
        <>
          <PageSection variant="light">
            <EmptyState style={{margin: "auto"}}>
              <EmptyStateIcon icon={LockIcon} />
              <Title size="lg" headingLevel="h3">
                Access permissions needed
              </Title>
              <EmptyStateBody>
                To access HA clusters management you need to be in the group
                haclient.
              </EmptyStateBody>
            </EmptyState>
          </PageSection>
        </>
      )}
    </Page>
  );
};
