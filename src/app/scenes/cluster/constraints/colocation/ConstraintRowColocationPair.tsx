import React from "react";
import { Gallery, GalleryItem } from "@patternfly/react-core";

import { types, url } from "app/store";
import { Link, useSelectedClusterName } from "app/view";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";
import { ConstraintCardColocationResource } from "./ConstraintCardColocationResource";

export const ConstraintRowColocationPair = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintColocationPair;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Colocation" />
          <ConstraintCell label="Resource">
            <Link to={url.cluster.resources(clusterName, constraint.rsc)} />
          </ConstraintCell>
          <ConstraintCell label="With resource">
            <Link
              to={url.cluster.resources(clusterName, constraint["with-rsc"])}
            />
          </ConstraintCell>
          <ConstraintCell label="Score" value={constraint.score} />
        </>
      }
      content={
        <>
          <ConstraintValue
            label="Node attribute"
            value={constraint["node-attribute"]}
          />
          <Gallery hasGutter>
            <GalleryItem>
              <ConstraintCardColocationResource
                label="Resource"
                id={constraint.rsc}
                role={constraint["rsc-role"]}
                instance={constraint["rsc-instance"]}
              />
            </GalleryItem>
            <GalleryItem>
              <ConstraintCardColocationResource
                label="With resource"
                id={constraint["with-rsc"]}
                role={constraint["with-rsc-role"]}
                instance={constraint["with-rsc-instance"]}
              />
            </GalleryItem>
          </Gallery>
        </>
      }
    />
  );
};
