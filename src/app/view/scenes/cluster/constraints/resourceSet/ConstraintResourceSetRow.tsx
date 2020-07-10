import React from "react";
import { DataListItem, DataListItemRow } from "@patternfly/react-core";

import { types, url } from "app/store";
import { Link } from "app/view";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell } from "../common";

export const ConstraintResourceSetRow = ({
  resourceSet,
}: {
  resourceSet: types.cluster.ConstraintResourceSet;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <DataListItem aria-labelledby="Resource set">
      <DataListItemRow>
        {"id-ref" in resourceSet && (
          <ConstraintCell label="Id reference" value={resourceSet["id-ref"]} />
        )}
        {!("id-ref" in resourceSet) && (
          <>
            <ConstraintCell label="Resources">
              <div key={resourceSet.id}>
                {resourceSet.resources
                  .map<React.ReactNode>(resourceId => (
                    <Link
                      key={resourceId}
                      to={url.cluster.nodes(clusterName, resourceId)}
                    />
                  ))
                  .reduce((prev, curr) => [prev, " ", curr])}
              </div>
            </ConstraintCell>
            <ConstraintCell label="Sequential" value={resourceSet.sequential} />
            <ConstraintCell
              label="Require all"
              value={resourceSet["require-all"]}
            />
            <ConstraintCell label="Ordering" value={resourceSet.ordering} />
            <ConstraintCell label="Action" value={resourceSet.action} />
            <ConstraintCell label="Role" value={resourceSet.role} />
          </>
        )}
      </DataListItemRow>
    </DataListItem>
  );
};
