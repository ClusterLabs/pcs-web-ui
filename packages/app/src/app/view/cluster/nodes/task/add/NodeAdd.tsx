import {
  NodeAuthWizardFooter,
  TaskFinishLibWizard,
  TaskSuccess,
  TaskSuccessAction,
  Wizard,
  WizardFooter,
  lib,
} from "app/view/share";

import {useTask} from "./useTask";
import {NodeName} from "./NodeName";
import {PrepareNode} from "./PrepareNode";
import {Addresses} from "./Addresses";
import {Sbd} from "./Sbd";
import {Review} from "./Review";

export const NodeAdd = () => {
  const {
    clusterName,
    close,
    nodeStart,
    isNameValid,
    isNodeCheckDoneValid,
    nodeAdd,
    state: {
      authProcessId,
      nodeName,
      libCall: {response, reports},
    },
  } = useTask();
  return (
    <Wizard
      task="nodeAdd"
      clusterName={clusterName}
      data-test="task-node-add"
      onClose={close}
      title="Add node"
      description="Add node to the cluster wizard"
      steps={[
        {
          name: "Enter node name",
          component: <NodeName />,
          footer: (
            <WizardFooter
              next={{actionIf: isNameValid}}
              back={{disabled: true}}
            />
          ),
        },
        {
          name: "Check node",
          component: <PrepareNode />,
          footer: authProcessId ? (
            <NodeAuthWizardFooter authProcessId={authProcessId} />
          ) : (
            <WizardFooter next={{disabled: !isNodeCheckDoneValid}} />
          ),
          canJumpTo: isNameValid,
        },
        {
          name: "Specify node addresses",
          component: <Addresses />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Configure sbd",
          component: <Sbd />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => nodeAdd(),
                label: "Add node",
              }}
            />
          ),
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Result",
          component: (
            <TaskFinishLibWizard
              response={response}
              taskName={`add node ${nodeName}`}
              success={
                <TaskSuccess
                  taskName={`add node ${nodeName}`}
                  primaryAction={
                    <TaskSuccessAction
                      label="Start node and close"
                      action={() => {
                        close();
                        nodeStart();
                      }}
                    />
                  }
                  secondaryActions={<TaskSuccessAction variant="secondary" />}
                />
              }
              backToUpdateSettingsStepName="Enter node name"
              proceedForce={() =>
                nodeAdd({newForceFlags: lib.reports.getForceFlags(reports)})
              }
              reports={reports}
            />
          ),
          isFinishedStep: true,
        },
      ]}
    />
  );
};
