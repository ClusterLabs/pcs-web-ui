import React from "react";
import {Badge, Icon} from "@patternfly/react-core";

import {Link, location, useSelectedClusterName} from "app/view/share";

export const ResourceAgregationInfo = ({
  icon: iconComponent,
  status,
  agregationName,
  resourceNameList,
}: {
  icon: React.ReactNode;
  status: React.ComponentProps<typeof Icon>["status"];
  agregationName: string;
  resourceNameList: string[];
}) => {
  const clusterName = useSelectedClusterName();

  if (resourceNameList.length === 0) {
    return null;
  }

  return (
    <div className="pf-u-my-sm">
      <Icon isInline status={status}>
        {iconComponent}
      </Icon>{" "}
      <Badge isRead>{resourceNameList.length}</Badge> resource
      {resourceNameList.length === 1 ? "" : "s"}{" "}
      {resourceNameList.length < 4 && (
        <span>
          (
          {resourceNameList
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
