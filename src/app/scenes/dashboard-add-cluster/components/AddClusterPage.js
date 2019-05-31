import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Wizard } from "@patternfly/react-core";

import DashboardPage from "app/scenes/dashboard/components/DashboardPage";

import { stepAuthStates } from "../constants";
import * as selectors from "../reducer";
import * as actions from "../actions";
import AddClusterStepAuth from "./AddClusterStepAuth";
import AddClusterStepAdd from "./AddClusterStepAdd";

const withState = connect(
  state => ({
    stepAuthState: selectors.getStepAuthState(state),
    nodeName: selectors.getNodeName(state),
  }),
  {
    cancel: () => push("/"),
    addCluster: actions.addCluster,
  },
);


const AddClusterPage = ({
  stepAuthState,
  cancel,
  addCluster,
  nodeName,
}) => {
  const steps = [
    {
      name: "Node authentication",
      component: <AddClusterStepAuth />,
      enableNext: stepAuthState === stepAuthStates.ALREADY_AUTHENTICATED,
    },
    {
      name: "Add cluster",
      component: <AddClusterStepAdd />,
    },
  ];
  return (
    <React.Fragment>
      <DashboardPage />
      <Wizard
        data-role="add-cluster-wizard"
        isOpen
        onNext={() => addCluster(nodeName)}
        onClose={cancel}
        title="Add existing cluster"
        description="Add existing cluster wizard"
        steps={steps}
      />
    </React.Fragment>
  );
};

export default withState(AddClusterPage);
