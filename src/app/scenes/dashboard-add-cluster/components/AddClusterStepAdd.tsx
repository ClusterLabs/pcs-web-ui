import React from "react";
import { useSelector } from "react-redux";

import { Spinner, InlineAlert } from "app/components";

import * as selectors from "../selectors";
import { ADD_STATE } from "../types";

const clusterHasBeenAddedStates: ADD_STATE[] = [
  "DASHBOARD_RELOADING",
  "SUCCESS",
];

const AddClusterAddStep = () => {
  const state = useSelector(selectors.getStepAddState);
  const errorMessage = useSelector(selectors.getStateError);
  return (
    <>
      {state === "STARTED" &&
        <Spinner data-role="waiting-add" text="adding existing cluster..." />
      }
      {
        clusterHasBeenAddedStates.includes(state) && (
          <InlineAlert
            variant="success"
            title="Cluster has been added."
            data-role="add-cluster-success"
          />
        )
      }
      {state === "DASHBOARD_RELOADING" && (
        <Spinner
          data-role="waiting-reload"
          text="waiting for dashboard reload"
        />
      )}
      {state === "ERROR" && (
        <InlineAlert
          variant="danger"
          title={errorMessage}
          data-role="add-cluster-error-message"
        />
      )}
    </>
  );
};

export default AddClusterAddStep;
