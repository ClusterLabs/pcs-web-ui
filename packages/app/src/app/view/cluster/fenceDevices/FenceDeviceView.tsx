import React from "react";

import {FenceDevice} from "app/view/cluster/types";
import {DetailLayout, Router, UrlTabs, useUrlTabs} from "app/view/share";

import {useClusterFenceAgent} from "./useFenceAgent";
import {FenceDeviceDetailView} from "./FenceDeviceDetailView";
import {FenceDeviceArgumentsView} from "./arguments";
import {FencePageToolbar} from "./FencePageToolbar";

const tabList = ["detail", "arguments"] as const;

export const FenceDeviceView = ({fenceDevice}: {fenceDevice: FenceDevice}) => {
  useClusterFenceAgent(fenceDevice.agentName);
  const {currentTab, matchedContext} = useUrlTabs(tabList);
  return (
    <DetailLayout
      caption={fenceDevice.id}
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
      data-test={`fence-device-detail ${fenceDevice.id}`}
      toolbar={<FencePageToolbar fenceDevice={fenceDevice} />}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && (
          <FenceDeviceDetailView fenceDevice={fenceDevice} />
        )}
        {currentTab === "arguments" && (
          <FenceDeviceArgumentsView fenceDevice={fenceDevice} />
        )}
      </Router>
    </DetailLayout>
  );
};
