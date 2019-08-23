import React from "react";
import { useSelector } from "react-redux";

import { Spinner, InlineAlert } from "app/components";

import * as selectors from "../selectors";
import { ADD_STATE } from "../types";

const AddClusterAddStep = () => {
  const state = useSelector(selectors.getStepAddState);
  const errorMessage = useSelector(selectors.getStateError);
  return (
    <React.Fragment>
      {state === ADD_STATE.STARTED &&
        <Spinner data-role="waiting-add" text="adding existing cluster..." />
      }
      {
        [
          ADD_STATE.DASHBOARD_RELOADING,
          ADD_STATE.SUCCESS,
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
      {state === ADD_STATE.DASHBOARD_RELOADING && (
        <Spinner
          data-role="waiting-reload"
          text="waiting for dashboard reload"
        />
      )}
      {state === ADD_STATE.ERROR && (
        <InlineAlert
          variant="danger"
          title={errorMessage}
          data-role="add-cluster-error-message"
        />
      )}
    </React.Fragment>
  );
};

export default AddClusterAddStep;
