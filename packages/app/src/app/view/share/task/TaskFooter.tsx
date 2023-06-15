import React from "react";
import {WizardFooter as PfWizardFooter} from "@patternfly/react-core";

export const TaskFooter = ({
  dataTest,
  children,
}: React.PropsWithChildren<{
  dataTest: () => {"data-test": string};
}>) => {
  return (
    <div {...dataTest()}>
      <PfWizardFooter>{children}</PfWizardFooter>
    </div>
  );
};
