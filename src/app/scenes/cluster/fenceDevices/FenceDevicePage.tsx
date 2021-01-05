import React from "react";

import { GroupDetailView, useClusterSelector } from "app/view";
import { selectors } from "app/store";

import { FenceDeviceDetailPage } from "./FenceDeviceDetailPage";
import { FenceDeviceList } from "./list";
export const FenceDevicePage: React.FC<{ urlPrefix: string }> = ({
  urlPrefix,
}) => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <GroupDetailView
        urlPrefix={urlPrefix}
        detailCard={<FenceDeviceDetailPage />}
        groupCard={
          <FenceDeviceList fenceDeviceList={cluster.fenceDeviceList} />
        }
      />
    </>
  );
};
