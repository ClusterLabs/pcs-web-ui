import React from "react";
import { Button } from "@patternfly/react-core";

import {
  ClusterWizardFooter,
  TaskFinishLibWizard,
  Wizard,
  lib,
} from "app/view/share";

import { useTask } from "./useTask";
import { NodeName } from "./NodeName";
import { PrepareNode } from "./PrepareNode";
import { AuthButton } from "./AuthButton";
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
            <ClusterWizardFooter
              nextIf={isNameValid}
              onClose={close}
              backDisabled
            />
          ),
        },
        {
          name: "Check node",
          component: <PrepareNode />,
          footer: authProcessId ? (
            <ClusterWizardFooter
              next={<AuthButton authProcessId={authProcessId} />}
              onClose={close}
            />
          ) : (
            <ClusterWizardFooter
              nextDisabled={!isNodeCheckDoneValid}
              onClose={close}
            />
          ),
          canJumpTo: isNameValid,
        },
        {
          name: "Specify node addresses",
          component: <Addresses />,
          footer: <ClusterWizardFooter onClose={close} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Configure sbd",
          component: <Sbd />,
          footer: <ClusterWizardFooter onClose={close} />,
          canJumpTo: isNameValid && isNodeCheckDoneValid,
        },
        {
          name: "Review",
          component: <Review />,
          footer: (
            <ClusterWizardFooter
              preNext={() => nodeAdd()}
              nextLabel="Create resource"
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
