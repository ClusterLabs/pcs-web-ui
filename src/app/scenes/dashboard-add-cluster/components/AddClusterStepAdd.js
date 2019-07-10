import React from "react";
import { useSelector } from "react-redux";

import { Spinner, InlineAlert } from "app/components";

import { selectors } from "../plugin";
import { stepAddStates } from "../constants";

const AddClusterAddStep = () => {
  const state = useSelector(selectors.getStepAddState);
  const errorMessages = useSelector(selectors.getStateError);
  return (
    <React.Fragment>
      {state === stepAddStates.STARTED &&
        <Spinner data-role="waiting-add" text="adding existing cluster..." />
      }
      {
        [
          stepAddStates.DASHBOARD_RELOADING,
          stepAddStates.SUCCESS,
        ].includes(state)
        &&
        (
          <InlineAlert
            variant="success"
            title="Cluster has been added."
            data-role="add-cluster-success"
          />
        )
      }
      {state === stepAddStates.DASHBOARD_RELOADING && (
        <Spinner
          data-role="waiting-reload"
          text="waiting for dashboard reload"
        />
      )}
      {state === stepAddStates.ERROR && (
        <InlineAlert
          variant="danger"
          title={errorMessages.join("\n")}
          data-role="add-cluster-error-message"
        />
      )}
    </React.Fragment>
  );
};

export default AddClusterAddStep;
