import React from "react";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  Title,
} from "@patternfly/react-core";
import { PlusCircleIcon } from "@patternfly/react-icons";

import { types } from "app/store";

export const NVPairListView = ({
  nvPairListView,
}: {
  nvPairListView: types.cluster.NVPair[];
}) => {
  return (
    <div className="pf-c-content">
      {nvPairListView.length === 0 && (
        <EmptyState style={{ margin: "auto" }}>
          <EmptyStateIcon icon={PlusCircleIcon} />
          <Title size="lg" headingLevel="h3">
            No attribute here.
          </Title>
          <EmptyStateBody>No attribute has been added.</EmptyStateBody>
        </EmptyState>
      )}
      {nvPairListView.length > 0 && (
        <dl>
          {nvPairListView.map(p => (
            <React.Fragment key={p.id}>
              <dt>{p.name}</dt>
              <dd>{p.value}</dd>
            </React.Fragment>
          ))}
        </dl>
      )}
    </div>
  );
};
