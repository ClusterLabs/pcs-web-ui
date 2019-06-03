import React from "react";
import { connect } from "react-redux";

import { Spinner } from "app/components";
import { Success, Error } from "app/components/StatusSign";

import { selectors } from "../plugin";
import { stepAddStates } from "../constants";

const withState = connect(
  state => ({
    state: selectors.getStepAddState(state),
    errorMessages: selectors.getStateError(state),
  }),
);

const AddClusterAddStep = ({ state, errorMessages }) => (
  <React.Fragment>
    {state === stepAddStates.STARTED &&
      <Spinner data-role="waiting-add" text="adding existing cluster..." />
    }
    {
      [stepAddStates.DASHBOARD_RELOADING, stepAddStates.SUCCESS].includes(state)
      &&
      (
        <Success
          data-role="add-cluster-success"
          label="Cluster has been added."
        />
      )
    }
    {state === stepAddStates.DASHBOARD_RELOADING &&
      <Spinner data-role="waiting-reload" text="waiting for dashboard reload" />
    }
    {state === stepAddStates.ERROR && (
      <Error
        label={errorMessages.join("\n")}
        data-role="add-cluster-error-message"
      />
    )}
  </React.Fragment>
);

export default withState(AddClusterAddStep);
