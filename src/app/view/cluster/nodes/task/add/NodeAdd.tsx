import React from "react";
import { Button } from "@patternfly/react-core";

import {
  NodeAuthWizardFooter,
  TaskFinishLibWizard,
  Wizard,
  WizardFooter,
  lib,
} from "app/view/share";

import { useTask } from "./useTask";
import { NodeName } from "./NodeName";
import { PrepareNode } from "./PrepareNode";
import { Addresses } from "./Addresses";
import { Sbd } from "./Sbd";
import { Review } from "./Review";

export const NodeAdd: React.FC = () => {
  const {
    close,
    nodeStart,
    isNameValid,
    isNodeCheckDoneValid,
    nodeAdd,
    state: {
      authProcessId,
      nodeName,
      libCall: { response, reports },
    },
  } = useTask();
  return (
    <Wizard
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
              next={{
                actionIf: isNameValid,
                task: "nodeAdd",
              }}
              onClose={close}
              backDisabled
            />
          ),
        },
        {
          name: "Check node",
          component: <PrepareNode />,
          footer: authProcessId ? (
            <NodeAuthWizardFooter
              authProcessId={authProcessId}
              task="nodeAdd"
              onClose={close}
            />
          ) : (
            <WizardFooter
              next={{
                disabled: !isNodeCheckDoneValid,
                task: "nodeAdd",
              }}
              onClose={close}
            />
          ),
          canJumpTo: isNameValid,
        },
        {
          name: "Specify node addresses",
          component: <Addresses />,
          footer: <WizardFooter onClose={close} next={{ task: "nodeAdd" }} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Configure sbd",
          component: <Sbd />,
          footer: <WizardFooter onClose={close} next={{ task: "nodeAdd" }} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <WizardFooter
              next={{
                preAction: () => nodeAdd(),
                label: "Create resource",
                task: "nodeAdd",
              }}
              onClose={close}
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
              successPrimaryActions={
                <Button
                  variant="primary"
                  onClick={() => {
                    close();
                    nodeStart();
                  }}
                >
                  Start node and close
                </Button>
              }
              successSecondaryActions={
                <Button variant="link" onClick={close}>
                  Close
                </Button>
              }
              close={close}
              backToUpdateSettingsStepName="Enter node name"
              proceedForce={() =>
                nodeAdd({ newForceFlags: lib.reports.getForceFlags(reports) })
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
