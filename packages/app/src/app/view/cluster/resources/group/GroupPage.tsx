import {Alert, Tab, Tabs} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Group} from "app/view/cluster/types";
import {ResourceDetailCaption, Router, useUrlTabs} from "app/view/share";
import {DetailLayout} from "app/view/cluster/share";

import {GroupDetail} from "./GroupDetail";
import {GroupPageToolbar} from "./toolbar";
import {GroupMeta} from "./GroupMeta";

const {currentGroup} = testMarks.cluster.resources;
const {tabs} = currentGroup;

const tabMap = {
  detail: (
    <Tab
      eventKey="detail"
      key="detail"
      title={"Detail"}
      {...tabs.detail.mark}
    />
  ),
  meta: <Tab eventKey="meta" key="meta" title="Meta" {...tabs.meta.mark} />,
};

export const GroupPage = ({group}: {group: Group}) => {
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as (keyof typeof tabMap)[],
  );
  return (
    <DetailLayout
      caption={
        <ResourceDetailCaption
          resourceId={group.id}
          type="group"
          {...currentGroup.id.mark}
        />
      }
      tabs={
        <Tabs activeKey={currentTab} onSelect={onSelect} {...tabs.mark}>
          {Object.values(tabMap)}
        </Tabs>
      }
      toolbar={<GroupPageToolbar group={group} />}
      {...currentGroup.mark}
    >
      {group.resources.some(r => r.itemType === "fence-device") && (
        <Alert
          variant="danger"
          isInline
          title="Unsupported fence device inside group"
        >
          This group contains a fence device which is unsupported. Please remove
          the fence device from the group via pcs
        </Alert>
      )}
      <Router base={matchedContext}>
        {currentTab === "detail" && <GroupDetail group={group} />}
        {currentTab === "meta" && <GroupMeta group={group} />}
      </Router>
    </DetailLayout>
  );
};
