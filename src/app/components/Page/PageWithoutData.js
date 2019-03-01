import React from "react";

import { Page, Spinner } from "app/components";

const PageWithoutData = ({
  loadingMessage,
  sidebarNavigation,
  breadcrumbs = true,
}) => (
  <Page sidebarNavigation={sidebarNavigation} breadcrumbs={breadcrumbs}>
    <Page.Section>
      <Spinner text={loadingMessage} />
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
