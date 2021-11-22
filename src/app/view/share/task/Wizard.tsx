import React from "react";
import {
  Wizard as PfWizard,
  WizardContextConsumer,
  WizardFooter,
  WizardStep,
} from "@patternfly/react-core";

import { wizardCreateFooterDataTest } from "./wizardCreateFooterDataTest";

const DefaultWizardStep: React.FC = () => {
  return <>DEFAULT WIZARD STEP</>;
};

type Step = WizardStep & { footer?: React.ReactNode; steps?: Step[] };
type Footer = { name: React.ReactNode; footer: React.ReactNode };

const defaultSteps: Step[] = [
  {
    name: "Default wizard step",
    component: <DefaultWizardStep />,
  },
];

const separateStepsAndFooters = (steps: Step[]) => {
  const stepList: WizardStep[] = [];
  let footerList: Footer[] = [];
  steps.forEach((stepWithFooter) => {
    if ("footer" in stepWithFooter === false) {
      stepList.push(stepWithFooter);
      return;
    }

    const { footer, ...pfStep } = stepWithFooter;
    footerList.push({ name: stepWithFooter.name, footer });

    if ("steps" in pfStep === false || pfStep.steps === undefined) {
      stepList.push(pfStep);
      return;
    }

    const { stepList: subStepList, footerList: subFooterList } =
      separateStepsAndFooters(pfStep.steps);

    footerList = footerList.concat(subFooterList);
    stepList.push({ ...pfStep, steps: subStepList });
  });
  return { stepList, footerList };
};

export const Wizard: React.FC<{
  ["data-test"]: string;
  steps?: Step[] | undefined;
  onClose: () => void;
  title: string;
  description: string;
}> = ({
  "data-test": dataTest,
  onClose,
  title,
  description,
  steps = undefined,
}) => {
  const { stepList, footerList } = separateStepsAndFooters(
    steps || defaultSteps,
  );

  return (
    <PfWizard
      data-test={dataTest}
      steps={stepList}
      isOpen
      onClose={onClose}
      title={title}
      description={description}
      isNavExpandable
      footer={
        <WizardContextConsumer>
          {({ activeStep }) => (
            <div data-test={wizardCreateFooterDataTest(activeStep.name)}>
              <WizardFooter>
                {footerList.find(f => f.name === activeStep.name)?.footer}
              </WizardFooter>
            </div>
          )}
        </WizardContextConsumer>
      }
    />
  );
};
