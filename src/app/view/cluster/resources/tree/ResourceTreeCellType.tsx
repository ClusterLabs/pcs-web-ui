import React from "react";

export const ResourceTreeCellType: React.FC<{
  type: string;
  typeDescription?: string;
}> = ({ type, typeDescription = "" }) => {
  return (
    <>
      <span>Type </span>
      <strong data-test="resource-tree-item-type">{type}</strong>
      {typeDescription && <span>{` (${typeDescription})`}</span>}
    </>
  );
};
