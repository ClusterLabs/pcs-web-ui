import React from "react";
import {Badge, Icon} from "@patternfly/react-core";

import {Link, location, useSelectedClusterName} from "app/view/share";

export const ResourceIssueInfo = ({
  icon: iconComponent,
  status,
  issueMap,
}: {
  icon: React.ReactNode;
  status: React.ComponentProps<typeof Icon>["status"];
  issueMap: Record<string, string[]>;
}) => {
  const clusterName = useSelectedClusterName();

  const issuePairs = Object.entries(issueMap);

  if (issuePairs.length === 0) {
    return null;
  }

  return (
    <>
      {issuePairs.map(([label, resourceIdList]) => (
        <div key={label}>
          <Icon isInline status={status}>
            {iconComponent}
          </Icon>{" "}
          <Badge isRead>{resourceIdList.length}</Badge> {label.toLowerCase()}
          {resourceIdList.length < 4 && (
            <span>
              (
              {resourceIdList
                .map<React.ReactNode>(resourceId => (
                  <Link
                    isInline
                    key={resourceId}
                    to={location.resource({clusterName, resourceId})}
                  />
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
              ){" "}
            </span>
          )}
        </div>
      ))}
    </>
  );
};
