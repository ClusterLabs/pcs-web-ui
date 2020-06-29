import React from "react";
import { Gallery, GalleryItem } from "@patternfly/react-core";

import { types, url } from "app/store";
import { Link } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { ConstraintCell, ConstraintRow, ConstraintValue } from "../common";

import { ConstraintCellOrderScoreKind } from "./ConstraintCellOrderScoreKind";
import { ConstraintCardOrderResource } from "./ConstraintCardOrderResource";

export const ConstraintRowOrderPair = ({
  constraint,
}: {
  constraint: types.cluster.ConstraintOrderPair;
}) => {
  const clusterName = useSelectedClusterName();
  return (
    <ConstraintRow
      id={constraint.id}
      dataListCells={
        <>
          <ConstraintCell label="Type" value="Order" />
          <ConstraintCell label="First">
            <Link to={url.cluster.resources(clusterName, constraint.first)} />
          </ConstraintCell>
          <ConstraintCell label="Then">
            <Link to={url.cluster.resources(clusterName, constraint.then)} />
          </ConstraintCell>
          <ConstraintCellOrderScoreKind constraint={constraint} />
        </>
      }
      content={
        <>
          <ConstraintValue label="Symetrical" value={constraint.symmetrical} />
          <ConstraintValue
            label="Require all"
            value={constraint["require-all"]}
          />
          <Gallery gutter="lg">
            <GalleryItem>
              <ConstraintCardOrderResource
                label="First resource"
                id={constraint.first}
                action={constraint["first-action"]}
                instance={constraint["first-instance"]}
              />
            </GalleryItem>
            <GalleryItem>
              <ConstraintCardOrderResource
                label="Then resource"
                id={constraint.then}
                action={constraint["then-action"]}
                instance={constraint["then-instance"]}
              />
            </GalleryItem>
          </Gallery>
        </>
      }
    />
  );
};
