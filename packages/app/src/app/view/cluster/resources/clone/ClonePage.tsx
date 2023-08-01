import {Alert} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Clone} from "app/view/cluster/types";
import {
  DetailLayout,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";
import {NVPairListPage} from "app/view/cluster/share";

import {CloneDetail} from "./CloneDetail";

const tabList = ["detail", "meta"] as const;

const {currentResurce} = testMarks.cluster.resources;

export const ClonePage = ({clone}: {clone: Clone}) => {
  const {currentTab, matchedContext} = useUrlTabs(tabList);
  if (clone.member.itemType !== "fence-device") {
    return (
      <DetailLayout
        caption={
          <ResourceDetailCaption
            resourceId={clone.id}
            type="clone"
            {...currentResurce.clone.id.mark}
          />
        }
        tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
        {...currentResurce.mark}
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
            <NVPairListPage
              nvPairList={clone.metaAttributes}
              owner={{
                type: "resource-meta",
                id: clone.id,
              }}
              createLabel="Create meta attribute"
            />
          )}
        </Router>
      </DetailLayout>
    );
  }
  return (
    <DetailLayout
      caption={
        <ResourceDetailCaption
          resourceId={clone.id}
          type="clone"
          {...currentResurce.clone.id.mark}
        />
      }
      {...currentResurce.mark}
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
