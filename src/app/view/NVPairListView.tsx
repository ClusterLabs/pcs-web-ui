import React from "react";

import { types } from "app/store";
import { AttributeList, AttributeName, AttributeValue } from "app/view";

export const NVPairListView = ({
  nvPairListView,
}: {
  nvPairListView: types.cluster.NVPair[];
}) => {
  return (
    <AttributeList attributes={nvPairListView}>
      {p => (
        <React.Fragment key={p.id}>
          <AttributeName name={p.name} />
          <AttributeValue value={p.value} />
        </React.Fragment>
      )}
    </AttributeList>
  );
};
