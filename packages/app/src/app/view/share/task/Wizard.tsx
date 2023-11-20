import React from "react";
import {
  Wizard as PfWizard,
  WizardContextConsumer,
  WizardStep,
} from "@patternfly/react-core";

import {selectors} from "app/store";
import {capitalizeFirst} from "app/store/tools";

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
  taskLabel,
  title,
  description,
  steps = undefined,
}: {
  ["data-test"]: string;
  steps?: Step[] | undefined;
  onClose: () => void;
  task: Parameters<typeof selectors.getTask>[0];
  taskLabel: string;
  title?: string;
  description: string;
}) => {
  const {stepList, footerList} = separateStepsAndFooters(steps || defaultSteps);

  return (
    <TaskContextProvider
      value={{
        task: task,
        close: onClose,
        taskLabel,
      }}
    >
      <PfWizard
        data-test={dataTest}
        steps={stepList}
        isOpen
        onClose={onClose}
        title={capitalizeFirst(title ?? taskLabel)}
        description={description}
        isNavExpandable
        footer={
          <WizardContextConsumer>
            {({activeStep}) =>
              footerList.find(f => f.name === activeStep.name)?.footer ?? (
                <WizardFooter />
              )
            }
          </WizardContextConsumer>
        }
      />
    </TaskContextProvider>
  );
};
