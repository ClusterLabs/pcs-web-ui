import React from "react";
import {Badge, Icon} from "@patternfly/react-core";

import {Link, location, useSelectedClusterName} from "app/view/share";

export const NodeAgregationInfo = ({
  icon: iconComponent,
  status,
  agregationName,
  nodeNameList,
}: {
  icon: React.ReactNode;
  status: React.ComponentProps<typeof Icon>["status"];
  agregationName: string;
  nodeNameList: string[];
}) => {
  const clusterName = useSelectedClusterName();

  if (nodeNameList.length === 0) {
    return null;
  }

  return (
    <div className="pf-u-my-sm">
      <Icon isInline status={status}>
        {iconComponent}
      </Icon>{" "}
      <Badge isRead>{nodeNameList.length}</Badge> node
      {nodeNameList.length === 1 ? "" : "s"}{" "}
      {nodeNameList.length < 4 && (
        <span>
          (
          {nodeNameList
            .map<React.ReactNode>(nodeName => (
              <Link
                isInline
                key={nodeName}
                to={location.node({clusterName, nodeName})}
              />
            ))
            .reduce((prev, curr) => [prev, ", ", curr])}
          ){" "}
        </span>
      )}
      {agregationName}
    </div>
  );
};
