import React from "react";
import { useSelector } from "react-redux";
import {
  Alert,
  EmptyState,
  EmptyStateIcon,
  Spinner,
  Title,
} from "@patternfly/react-core";

import { selectors, types } from "app/store";

const clusterHasBeenAddedStates: types.addCluster.ADD_STATE[] = [
  "DASHBOARD_RELOADING",
  "SUCCESS",
];

export const AddClusterStepAdd = () => {
  const state = useSelector(selectors.addClusterGetStepAddState);
  const errorMessage = useSelector(selectors.addClusterGetStateError);
  return (
    <>
      {state === "STARTED" && (
      <EmptyState style={{ margin: "auto" }}>
        <EmptyStateIcon variant="container" component={Spinner} />
        <Title size="lg">Adding existing cluster</Title>
      </EmptyState>
      )}
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
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon variant="container" component={Spinner} />
          <Title size="lg">Waiting for dashboard reload</Title>
        </EmptyState>
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
