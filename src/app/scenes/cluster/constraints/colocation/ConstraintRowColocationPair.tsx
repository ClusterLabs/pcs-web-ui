import React from "react";
import { DataListCell, Gallery, GalleryItem } from "@patternfly/react-core";

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
          <ConstraintCell label="Type" value="Colocation" width={1} />
          <DataListCell width={3}>
            {"Resource "}
            <strong>
              <Link to={url.cluster.resources(clusterName, constraint.rsc)} />
            </strong>
            {" in role "}
            <strong>{constraint["rsc-role"] || "Started"}</strong>
            {constraint.score === "INFINITY"
            || (constraint.score
              && typeof constraint.score === "number"
              && constraint.score > 0)
              ? " together with "
              : " apart from "}
            {" resource "}
            <strong>
              <Link
                to={url.cluster.resources(clusterName, constraint["with-rsc"])}
              />
            </strong>
            {" in role "}
            <strong>{constraint["with-rsc-role"] || "Started"}</strong>
          </DataListCell>

          <ConstraintCell label="Score" value={constraint.score} width={1} />
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
