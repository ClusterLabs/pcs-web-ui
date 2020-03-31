import React from "react";

export const ResourceTreeCellType = ({ type, typeDescription = "" }: {
  type: string;
  typeDescription?: string;
}) => {
  return (
    <>
      <span>Type </span>
      <strong aria-label="Resource type">{type}</strong>
      {typeDescription && <span>{` (${typeDescription})`}</span>}
    </>
  );
};
