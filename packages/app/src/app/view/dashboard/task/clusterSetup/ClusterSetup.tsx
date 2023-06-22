import {testMarks} from "app/view/dataTest";
import {Wizard} from "app/view/share";

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
import {AdvancedOptionsFooter} from "./AdvancedOptionsFooter";
import {Result} from "./Result";

export const ClusterSetup = () => {
  const {
    close,
    isClusterNameValid,
    areNodeNamesValid,
    isClusterNameAndNodeCheckDoneValid,
    areLinksValid,
  } = useTask();
  const clusterNameAndNodes = "Cluster name and nodes";
  const review = "Review";
  return (
    <Wizard
      clusterName={null}
      task="clusterSetup"
      {...testMarks.setupCluster.mark}
      taskLabel="Setup cluster"
      description="Setup new cluster on nodes"
      onClose={close}
      steps={[
        {
          name: clusterNameAndNodes,
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
              footer: <AdvancedOptionsFooter />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid,
            },
            {
              name: "Transport Options",
              component: <TransportOptions />,
              footer: <AdvancedOptionsFooter />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
            },
            {
              name: "Quorum",
              component: <Quorum />,
              footer: <AdvancedOptionsFooter />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
            },
            {
              name: "Totem",
              component: <Totem />,
              footer: <AdvancedOptionsFooter />,
              canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
            },
          ],
        },
        {
          name: review,
          component: <Review />,
          footer: <ReviewFooter />,
          canJumpTo: isClusterNameAndNodeCheckDoneValid && areLinksValid,
        },
        {
          name: "Result",
          component: (
            <Result backStep={clusterNameAndNodes} reviewStep={review} />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
