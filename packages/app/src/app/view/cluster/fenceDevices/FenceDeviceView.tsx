import {Tab, Tabs} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {FenceDevice} from "app/view/cluster/types";
import {Router, useUrlTabs} from "app/view/share";
import {DetailLayout} from "app/view/cluster/share";

import {useClusterFenceAgent} from "./useFenceAgent";
import {FenceDeviceDetailView} from "./FenceDeviceDetailView";
import {FenceDeviceArgumentsView} from "./FenceDeviceArgumentsView";
import {FencePageToolbar} from "./FencePageToolbar";

const {currentFenceDevice} = testMarks.cluster.fenceDevices;
const {tabs} = currentFenceDevice;

const tabMap = {
  detail: (
    <Tab
      eventKey="detail"
      key="detail"
      title={"Detail"}
      {...tabs.detail.mark}
    />
  ),
  arguments: (
    <Tab
      eventKey="arguments"
      key="arguments"
      title="Arguments"
      {...tabs.arguments.mark}
    />
  ),
};

export const FenceDeviceView = ({fenceDevice}: {fenceDevice: FenceDevice}) => {
  useClusterFenceAgent(fenceDevice.agentName);
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as (keyof typeof tabMap)[],
  );
  return (
    <DetailLayout
      caption={
        <strong {...currentFenceDevice.id.mark}>{fenceDevice.id}</strong>
      }
      tabs={
        <Tabs activeKey={currentTab} onSelect={onSelect} {...tabs.mark}>
          {Object.values(tabMap)}
        </Tabs>
      }
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
