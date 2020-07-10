import React from "react";

export const ResourceTreeCellType = ({
  type,
  typeDescription = "",
}: {
  type: string;
  typeDescription?: string;
}) => {
  return (
    <>
      <span>Type </span>
      <strong data-test="resource-tree-item-type">{type}</strong>
      {typeDescription && <span>{` (${typeDescription})`}</span>}
    </>
  );
};
