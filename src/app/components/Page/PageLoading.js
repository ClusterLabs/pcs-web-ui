import React from "react";
import { Button } from "@patternfly/react-core";

import { Page, Spinner } from "app/components";

export const PageLoading = ({
  loadingMessage,
  isError,
  errorMessage,
  retry,
  sidebarNavigation,
}) => (
  <Page sidebarNavigation={sidebarNavigation}>
    <Page.Section>
      {
        isError
          ? (
            <React.Fragment>
              <div>
                {`Error: ${errorMessage}`}
              </div>
              <Button onClick={retry}>Retry</Button>
            </React.Fragment>
          )
          : <Spinner text={loadingMessage} />
      }
    </Page.Section>
  </Page>
);

export const withViewForNoData = (
  (getDataFetchProps, container = (x => x)) => BasePageComponent => (props) => {
    const {
      isSuccess,
      isError,
      loadingMessage,
      errorMessage,
      retry,
    } = getDataFetchProps(props);

    if (isSuccess) {
      return React.createFactory(BasePageComponent)(props);
    }

    return React.createFactory(container(PageLoading))({
      loadingMessage,
      isError,
      errorMessage,
      retry,
    });
  }
);
