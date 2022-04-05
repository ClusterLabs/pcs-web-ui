import React from "react";

import { NVPair } from "app/view/cluster/types";
import {
  AttributeList,
  AttributeName,
  AttributeValue,
} from "app/view/share/attributes";

export const NVPairListViewOld = ({
  nvPairListView,
}: {
  nvPairListView: NVPair[];
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
