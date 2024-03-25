import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateHeader,
  EmptyStateIcon,
  PageSection,
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
              <EmptyStateHeader
                titleText="Access permissions needed"
                headingLevel="h1"
              />
              <EmptyStateBody>
                To access HA clusters management you need to be in the group
                haclient or gain administrative access.
              </EmptyStateBody>
              <EmptyStateFooter>
                <EmptyStateActions>
                  <Button
                    variant="primary"
                    onClick={() => pcsUiEnvAdapter.jump("/users/")}
                  >
                    Go to user settings
                  </Button>
                </EmptyStateActions>
              </EmptyStateFooter>
            </EmptyState>
          </PageSection>
        </>
      )}
    </Page>
  );
};
