import React from "react";

import { types } from "app/store";

export const NVPairListView = ({
  nvPairListView,
}: {
  nvPairListView: types.cluster.NVPair[];
}) => {
  return (
    <div className="pf-c-content">
      <dl>
        {nvPairListView.map(p => (
          <React.Fragment key={p.id}>
            <dt>{p.name}</dt>
            <dd>{p.value}</dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
};
