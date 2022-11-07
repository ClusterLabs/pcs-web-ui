import React from "react";
import {Label} from "@patternfly/react-core";

import {Link, location, useSelectedClusterName} from "app/view/share";

export const ResourceIssueInfo = ({
  icon: iconComponent,
  color,
  issueMap,
}: {
  icon: React.ReactNode;
  color: React.ComponentProps<typeof Label>["color"];
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
        <div key={label} className="pf-u-my-xs">
          <Label icon={iconComponent} color={color}>
            <strong className="pf-u-mr-xs">{resourceIdList.length}</strong>
            {label.toLowerCase()}
          </Label>{" "}
          {resourceIdList.length < 4 && (
            <span>
              {resourceIdList
                .map<React.ReactNode>(resourceId => (
                  <Link
                    isInline
                    key={resourceId}
                    to={location.resource({clusterName, resourceId})}
                  />
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}{" "}
            </span>
          )}
        </div>
      ))}
    </>
  );
};
