import {Alert} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Group} from "app/view/cluster/types";
import {
  DetailLayout,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";
import {NVPairListPage} from "app/view/cluster/share";

import {GroupDetail} from "./GroupDetail";
import {GroupPageToolbar} from "./GroupPageToolbar";

const tabList = ["detail", "meta"] as const;

const {currentGroup} = testMarks.cluster.resources;

export const GroupPage = ({group}: {group: Group}) => {
  const {currentTab, matchedContext} = useUrlTabs(tabList);
  return (
    <DetailLayout
      caption={
        <ResourceDetailCaption
          resourceId={group.id}
          type="group"
          {...currentGroup.id.mark}
        />
      }
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
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
        {currentTab === "meta" && (
          <NVPairListPage
            nvPairList={group.metaAttributes}
            owner={{
              type: "resource-meta",
              id: group.id,
            }}
            createLabel="Create meta attribute"
          />
        )}
      </Router>
    </DetailLayout>
  );
};
