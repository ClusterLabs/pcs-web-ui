import React from "react";
import { DetailLayout, useGroupDetailViewContext } from "app/view/common";

export const FenceDeviceDetailPage = () => {
  const { selectedItemUrlName } = useGroupDetailViewContext();
  return <DetailLayout caption={selectedItemUrlName} />;
};
