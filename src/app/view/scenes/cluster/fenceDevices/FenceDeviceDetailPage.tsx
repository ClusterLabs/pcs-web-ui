import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "app/store";
import { useGroupDetailViewContext } from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { FenceDeviceDoesNotExists } from "./FenceDeviceDoesNotExists";
import { FenceDeviceView } from "./FenceDeviceView";

export const FenceDeviceDetailPage = () => {
  const { selectedItemUrlName } = useGroupDetailViewContext();

  const fenceDevice = useSelector(
    selectors.getSelectedFenceDevice(
      useSelectedClusterName(),
      selectedItemUrlName,
    ),
  );

  if (!fenceDevice) {
    return (
      <FenceDeviceDoesNotExists fenceDeviceUrlName={selectedItemUrlName} />
    );
  }
  return <FenceDeviceView fenceDevice={fenceDevice} />;
};
