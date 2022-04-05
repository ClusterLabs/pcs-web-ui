import { Alert } from "@patternfly/react-core";

import { Clone } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";

import { CloneDetail } from "./CloneDetail";

const tabList = ["detail", "meta"] as const;

export const ClonePage = ({ clone }: { clone: Clone }) => {
  const { currentTab, matchedContext } = useUrlTabs(tabList);
  if (clone.member.itemType !== "fence-device") {
    return (
      <DetailLayout
        caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
        tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
        data-test={`resource-detail ${clone.id}`}
      >
        <Router base={matchedContext}>
          {currentTab === "detail" && (
            <CloneDetail
              id={clone.id}
              member={clone.member}
              issueList={clone.issueList}
            />
          )}
          {currentTab === "meta" && (
            <NVPairListView
              nvPairList={clone.metaAttributes}
              owner={{
                type: "resource-meta",
                id: clone.id,
              }}
              createLabel="Create Meta Attribute"
            />
          )}
        </Router>
      </DetailLayout>
    );
  }
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
      data-test={`resource-detail ${clone.id}`}
    >
      <Alert
        variant="danger"
        isInline
        title="Unsupported clone of fence device"
      >
        Cloned fence device is not supported. Please unclone this fence device
        via pcs.
      </Alert>
    </DetailLayout>
  );
};
