import React from "react";
import { Page as PfPage } from "@patternfly/react-core";

import { BackgroundImage } from "./BackgroundImage";
import { PageHeader } from "./PageHeader";

export const Page: React.FC = ({ children }) => {
  return (
    <>
      <BackgroundImage />
      <PfPage header={<PageHeader />}>{children}</PfPage>
    </>
  );
};
