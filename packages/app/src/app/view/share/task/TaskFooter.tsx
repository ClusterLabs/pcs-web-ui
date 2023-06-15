import React from "react";
import {WizardFooter as PfWizardFooter} from "@patternfly/react-core";

export const TaskFooter = (
  props: React.PropsWithChildren<{"data-test": string}>,
) => {
  return (
    <div data-test={props["data-test"]}>
      <PfWizardFooter>{props.children}</PfWizardFooter>
    </div>
  );
};
