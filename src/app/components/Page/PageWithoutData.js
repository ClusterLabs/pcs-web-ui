import React from "react";
import { Button } from "@patternfly/react-core";

import { Page, Spinner } from "app/components";

const PageWithoutData = ({
  loadingMessage,
  isError,
  errorMessage,
  retry,
  sidebarNavigation,
  breadcrumbs = true,
}) => (
  <Page sidebarNavigation={sidebarNavigation} breadcrumbs={breadcrumbs}>
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

const withViewForNoData = (
  getDataFetchProps => BasePageComponent => (props) => {
    const { isSuccess, ...noDataProps } = getDataFetchProps(props);

    if (isSuccess) {
      return React.createElement(BasePageComponent, props);
    }

    return React.createElement(PageWithoutData, { ...props, ...noDataProps });
  }
);

export default withViewForNoData;
