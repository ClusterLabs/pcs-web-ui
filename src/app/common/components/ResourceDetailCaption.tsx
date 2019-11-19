import React from "react";

const ResourceDetailCaption = ({ resourceId, type }: {
  resourceId: string;
  type: string;
}) => (
  <>
    <strong>{`${resourceId} `}</strong>
    <span>{`(${type})`}</span>
  </>
);

export default ResourceDetailCaption;
