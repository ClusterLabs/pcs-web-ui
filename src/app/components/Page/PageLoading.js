import React from "react";
import { Button } from "@patternfly/react-core";

import { Page, Spinner } from "app/components";

import {
  compose,
  branch,
  renderComponent,
  withProps,
} from "recompose";

export const PageLoading = ({
  loadingMsg,
  isError,
  errorMsg,
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
                {`Error: ${errorMsg}`}
              </div>
              <Button onClick={retry}>Retry</Button>
            </React.Fragment>
          )
          : <Spinner text={loadingMsg} />
      }
    </Page.Section>
  </Page>
);

export const withPageLoading = (test, getProps, container = (x => x)) => branch(
  test,
  compose(withProps(getProps), container, renderComponent(PageLoading)),
);
