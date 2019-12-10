import React from "react";
import { Page as PfPage } from "@patternfly/react-core";

import BackgroundImage from "./BackgroundImage";
import PageHeader from "./PageHeader";
import Breadcrumbs from "./Breadcrumbs";

const Page = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <BackgroundImage />
    <PfPage header={<PageHeader />}>
      <Breadcrumbs />
      {children}
    </PfPage>
  </>
);

export default Page;
