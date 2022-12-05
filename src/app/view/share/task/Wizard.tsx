import React from "react";
import {
  Wizard as PfWizard,
  WizardFooter as PfWizardFooter,
  WizardContextConsumer,
  WizardStep,
} from "@patternfly/react-core";

import {selectors} from "app/store";

import {wizardCreateFooterDataTest} from "./wizardCreateFooterDataTest";
import {TaskContextProvider} from "./TaskContext";
import {WizardFooter} from "./WizardFooter";

const DefaultWizardStep = () => {
  return <>DEFAULT WIZARD STEP</>;
};

type Step = WizardStep & {footer?: React.ReactNode; steps?: Step[]};
type Footer = {name: React.ReactNode; footer: React.ReactNode};

const defaultSteps: Step[] = [
  {
    name: "Default wizard step",
    component: <DefaultWizardStep />,
  },
];

const separateStepsAndFooters = (steps: Step[]) => {
  const stepList: WizardStep[] = [];
  let footerList: Footer[] = [];
  steps.forEach(stepWithFooter => {
    let pfStep;
    if ("footer" in stepWithFooter) {
      const {footer, ...rest} = stepWithFooter;
      footerList.push({name: stepWithFooter.name, footer});
      pfStep = rest;
    } else {
      pfStep = stepWithFooter;
    }

    if ("steps" in pfStep === false || pfStep.steps === undefined) {
      stepList.push(pfStep);
      return;
    }

    const {stepList: subStepList, footerList: subFooterList} =
      separateStepsAndFooters(pfStep.steps);

    footerList = footerList.concat(subFooterList);
    stepList.push({...pfStep, steps: subStepList});
  });
  return {stepList, footerList};
};

export const Wizard = ({
  "data-test": dataTest,
  onClose,
  task,
  clusterName,
  title,
  description,
  steps = undefined,
}: {
  ["data-test"]: string;
  steps?: Step[] | undefined;
  onClose: () => void;
  title: string;
  description: string;
} & (
  | {
      task: Parameters<typeof selectors.getClusterTask>[0];
      clusterName: string;
    }
  | {
      task: Parameters<typeof selectors.getTask>[0];
      clusterName: null;
    }
)) => {
  const {stepList, footerList} = separateStepsAndFooters(steps || defaultSteps);

  return (
    <TaskContextProvider
      value={{
        task: task,
        close: onClose,
        clusterName,
      }}
    >
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
            {({activeStep}) => (
              <div data-test={wizardCreateFooterDataTest(activeStep.name)}>
                <PfWizardFooter>
                  {footerList.find(f => f.name === activeStep.name)?.footer ?? (
                    <WizardFooter />
                  )}
                </PfWizardFooter>
              </div>
            )}
          </WizardContextConsumer>
        }
      />
    </TaskContextProvider>
  );
};
