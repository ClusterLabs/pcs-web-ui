import {testMarks} from "app/view/dataTest";
import {FenceDevice} from "app/view/cluster/types";
import {DetailLayout, Router, UrlTabs, useUrlTabs} from "app/view/share";

import {useClusterFenceAgent} from "./useFenceAgent";
import {FenceDeviceDetailView} from "./FenceDeviceDetailView";
import {FenceDeviceArgumentsView} from "./arguments";
import {FencePageToolbar} from "./FencePageToolbar";

const tabList = ["detail", "arguments"] as const;

const {currentFenceDevice} = testMarks.clusterDetail.fenceDevices.detail;

export const FenceDeviceView = ({fenceDevice}: {fenceDevice: FenceDevice}) => {
  useClusterFenceAgent(fenceDevice.agentName);
  const {currentTab, matchedContext} = useUrlTabs(tabList);
  return (
    <DetailLayout
      caption={
        <strong {...currentFenceDevice.id.mark}>{fenceDevice.id}</strong>
      }
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
      toolbar={<FencePageToolbar fenceDevice={fenceDevice} />}
      {...currentFenceDevice.mark}
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
