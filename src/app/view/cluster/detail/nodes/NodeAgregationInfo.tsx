import React from "react";
import {Label} from "@patternfly/react-core";

import {Link, location, useSelectedClusterName} from "app/view/share";

export const NodeAgregationInfo = ({
  icon: iconComponent,
  color,
  agregationName,
  nodeNameList,
}: {
  icon: React.ReactNode;
  color: React.ComponentProps<typeof Label>["color"];
  agregationName: string;
  nodeNameList: string[];
}) => {
  const clusterName = useSelectedClusterName();

  if (nodeNameList.length === 0) {
    return null;
  }

  return (
    <div className="pf-u-my-xs">
      <Label icon={iconComponent} color={color}>
        <strong className="pf-u-mr-xs">{nodeNameList.length}</strong>
        {agregationName}
      </Label>{" "}
      {nodeNameList.length < 4 && (
        <span>
          {nodeNameList
            .map<React.ReactNode>(nodeName => (
              <Link
                isInline
                key={nodeName}
                to={location.node({clusterName, nodeName})}
              />
            ))
            .reduce((prev, curr) => [prev, ", ", curr])}{" "}
        </span>
      )}
    </div>
  );
};
