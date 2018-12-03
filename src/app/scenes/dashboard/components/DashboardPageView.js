import React from "react";

import { Page } from "app/components";

import Dashboard from "./Dashboard";

const DashboardPageView = ({ dashboard, actions }) => (
  <Page>
    <Page.Section>
      <Dashboard dashboard={dashboard} actions={actions} />
    </Page.Section>
  </Page>
);

export default DashboardPageView;
