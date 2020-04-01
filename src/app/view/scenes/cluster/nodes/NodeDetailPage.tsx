import React from "react";
import { useGroupDetailViewContext, DetailLayout } from "app/view/common";

export const NodeDetailPage = () => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  return (
    <DetailLayout caption={selectedItemUrlName} />
  );
};
