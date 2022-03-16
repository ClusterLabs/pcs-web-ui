import {
  NodeAuthWizardFooter,
  TaskFinishLibWizard,
  Wizard,
  WizardFooter,
} from "app/view/share";

import { useTask } from "./useTask";
import { NameAndNodes } from "./NameAndNodes";
import { PrepareNodes } from "./PrepareNodes";
import { Review } from "./Review";
import { Transport } from "./Transport";
import { TransportOptions } from "./TransportOptions";
import { Quorum } from "./Quorum";
import { Totem } from "./Totem";

export const ClusterSetup = () => {
  const {
    close,
    startClusterAndClose,
    isClusterNameValid,
    areNodeNamesValid,
    isClusterNameAndNodeCheckDoneValid,
    areLinksValid,
    setupCluster,
    state: {
      authProcessId,
      libCall: { reports, response },
    },
  } = useTask();
  return (
    <Wizard
      task="clusterSetup"
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
              next={{
                actionIf: isClusterNameValid && areNodeNamesValid,
              }}
              back={{ disabled: true }}
            />
          ),
        },
        {
          name: "Check cluster name and nodes",
          component: <PrepareNodes />,
          canJumpTo: isClusterNameValid && areNodeNamesValid,
          footer: authProcessId ? (
            <NodeAuthWizardFooter authProcessId={authProcessId} />
          ) : (
            <WizardFooter
              next={{
                disabled: !isClusterNameAndNodeCheckDoneValid,
              }}
              reviewAndFinish={{ label: "Review and setup cluster" }}
            />
          ),
        },
        {
          name: "Advanced options",
          component: <Transport />,
          canJumpTo:
            isClusterNameValid
            && areNodeNamesValid
            && isClusterNameAndNodeCheckDoneValid,
          steps: [
            {
              name: "Transport links",
              component: <Transport />,
              footer: <WizardFooter next={{ actionIf: areLinksValid }} />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid,
            },
            {
              name: "Transport Options",
              component: <TransportOptions />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
            },
            {
              name: "Quorum",
              component: <Quorum />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
            },
            {
              name: "Totem",
              component: <Totem />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
            },
          ],
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => setupCluster(),
                label: "Setup cluster",
              }}
            />
          ),
          canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName="setup new cluster"
              backToUpdateSettingsStepName="Cluster name and nodes"
              proceedForce={() => setupCluster({ force: true })}
              success={{
                secondaryActions: {
                  "Start cluster and close": startClusterAndClose,
                },
              }}
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
