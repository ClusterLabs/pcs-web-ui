import { Alert } from "@patternfly/react-core";

import { Group } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";

import { GroupDetail } from "./GroupDetail";
import { GroupPageToolbar } from "./GroupPageToolbar";

const tabList = ["detail", "meta"] as const;

export const GroupPage = ({ group }: { group: Group }) => {
  const { currentTab, matchedContext } = useUrlTabs(tabList);
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={group.id} type="group" />}
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
      toolbar={<GroupPageToolbar group={group} />}
      data-test={`resource-detail ${group.id}`}
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
          <NVPairListView
            nvPairList={group.metaAttributes}
            owner={{
              type: "resource-meta",
              id: group.id,
            }}
            createLabel="Create Meta Attribute"
          />
        )}
      </Router>
    </DetailLayout>
  );
};
