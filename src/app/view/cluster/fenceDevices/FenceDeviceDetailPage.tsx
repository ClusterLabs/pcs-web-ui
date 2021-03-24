import React from "react";

import { selectors } from "app/store";
import { useClusterSelector, useGroupDetailViewContext } from "app/view/share";

import { FenceDeviceDoesNotExists } from "./FenceDeviceDoesNotExists";
import { FenceDeviceView } from "./FenceDeviceView";

export const FenceDeviceDetailPage = () => {
  const { selectedItemUrlName } = useGroupDetailViewContext();

  const [fenceDevice] = useClusterSelector(
    selectors.getSelectedFenceDevice,
    selectedItemUrlName,
  );

  if (!fenceDevice) {
    return (
      <FenceDeviceDoesNotExists fenceDeviceUrlName={selectedItemUrlName} />
    );
  }
  return <FenceDeviceView fenceDevice={fenceDevice} />;
};
