import React from "react";
import { DataListItem, DataListItemRow } from "@patternfly/react-core";

import { types } from "app/store";
import { Link } from "app/view/common";
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
                {resourceSet.resources.map(resourceId => (
                  <Link
                    key={resourceId}
                    to={`/cluster/${clusterName}/resources/${resourceId}`}
                  >
                    {`${resourceId} `}
                  </Link>
                ))}
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
