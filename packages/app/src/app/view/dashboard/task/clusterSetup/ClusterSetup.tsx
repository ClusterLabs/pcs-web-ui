import {testMarks} from "app/view/dataTest";
import {TaskFinishLibWizard, Wizard, WizardFooter} from "app/view/share";

import {useTask} from "./useTask";
import {NameAndNodes} from "./NameAndNodes";
import {NameAndNodesFooter} from "./NameAndNodesFooter";
import {PrepareNodes} from "./PrepareNodes";
import {PrepareNodesFooter} from "./PrepareNodesFooter";
import {Review} from "./Review";
import {ReviewFooter} from "./ReviewFooter";
import {Transport} from "./Transport";
import {TransportOptions} from "./TransportOptions";
import {Quorum} from "./Quorum";
import {Totem} from "./Totem";

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
      libCall: {reports, response},
    },
  } = useTask();
  return (
    <Wizard
      clusterName={null}
      task="clusterSetup"
      {...testMarks.setupCluster.mark}
      title="Setup cluster"
      description="Setup new cluster on nodes"
      onClose={close}
      steps={[
        {
          id: "clusterNameAndNodes",
          name: "Cluster name and nodes",
          component: <NameAndNodes />,
          footer: <NameAndNodesFooter />,
        },
        {
          name: "Check cluster name and nodes",
          component: <PrepareNodes />,
          canJumpTo: isClusterNameValid && areNodeNamesValid,
          footer: <PrepareNodesFooter />,
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
              footer: <WizardFooter next={{actionIf: areLinksValid}} />,
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
          footer: <ReviewFooter />,
          canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName="setup new cluster"
              backToUpdateSettingsStepName="Cluster name and nodes"
              proceedForce={() => setupCluster({force: true})}
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
