import React from "react";

import {
  NodeAuthButton,
  TaskFinishLibWizard,
  Wizard,
  WizardFooter,
} from "app/view/share";

import { useTask } from "./useTask";
import { NameAndNodes } from "./NameAndNodes";
import { PrepareNodes } from "./PrepareNodes";
import { Review } from "./Review";
import { Transport } from "./Transport";
import { Quorum } from "./Quorum";
import { Totem } from "./Totem";

export const ClusterSetup: React.FC = () => {
  const {
    close,
    isOpened,
    isClusterNameValid,
    areNodeNamesValid,
    isClusterNameAndNodeCheckDoneValid,
    setupCluster,
    state: {
      authProcessId,
      libCall: { reports, response },
    },
  } = useTask();
  return isOpened ? (
    <Wizard
      data-test="task-cluster-setup"
      title="Setup cluster"
      description="Setup new cluster on nodes"
      onClose={close}
      steps={[
        {
          name: "Cluster name and nodes",
          component: <NameAndNodes />,
          footer: (
            <WizardFooter
              onClose={close}
              backDisabled
              task="clusterSetup"
              nextIf={isClusterNameValid && areNodeNamesValid}
            />
          ),
        },
        {
          name: "Check cluster name and nodes",
          component: <PrepareNodes />,
          footer: authProcessId ? (
            <WizardFooter
              next={<NodeAuthButton authProcessId={authProcessId} />}
              onClose={close}
              task="clusterSetup"
            />
          ) : (
            <WizardFooter
              nextDisabled={!isClusterNameAndNodeCheckDoneValid}
              onClose={close}
              task="clusterSetup"
            />
          ),
        },
        {
          name: "Knet Transport",
          component: <Transport />,
          footer: <WizardFooter onClose={close} task="nodeAdd" />,
          canJumpTo: isClusterNameAndNodeCheckDoneValid,
        },
        {
          name: "Quorum",
          component: <Quorum />,
          footer: <WizardFooter onClose={close} task="nodeAdd" />,
          canJumpTo: isClusterNameAndNodeCheckDoneValid,
        },
        {
          name: "Totem",
          component: <Totem />,
          footer: <WizardFooter onClose={close} task="nodeAdd" />,
          canJumpTo: isClusterNameAndNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              preNext={() => setupCluster()}
              nextLabel="Create resource"
              onClose={close}
              task="nodeAdd"
            />
          ),
          canJumpTo: isClusterNameAndNodeCheckDoneValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName="setup new cluster"
              close={close}
              backToUpdateSettingsStepName="Cluster name and nodes"
              proceedForce={() => setupCluster({ force: true })}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  ) : null;
};
