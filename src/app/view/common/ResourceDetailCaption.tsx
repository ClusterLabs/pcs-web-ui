import React from "react";

export const ResourceDetailCaption = ({
  resourceId,
  type,
}: {
  resourceId: string;
  type: string;
}) => (
  <>
    <strong>{`${resourceId} `}</strong>
    <span>{`(${type})`}</span>
  </>
);
