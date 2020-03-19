import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { selectors, types } from "app/store";
import { Spinner } from "app/view/common";

const clusterHasBeenAddedStates: types.addCluster.ADD_STATE[] = [
  "DASHBOARD_RELOADING",
  "SUCCESS",
];

export const AddClusterStepAdd = () => {
  const state = useSelector(selectors.addClusterGetStepAddState);
  const errorMessage = useSelector(selectors.addClusterGetStateError);
  return (
    <>
      {state === "STARTED" && <Spinner text="adding existing cluster..." />}
      {
        clusterHasBeenAddedStates.includes(state) && (
          <Alert
            isInline
            variant="success"
            title="Cluster has been added."
            aria-label="Success add cluster"
          />
        )
      }
      {state === "DASHBOARD_RELOADING" && (
        <Spinner text="waiting for dashboard reload" />
      )}
      {state === "ERROR" && (
        <Alert
          isInline
          variant="danger"
          title={errorMessage}
          aria-label="Error add cluster"
        />
      )}
    </>
  );
};
