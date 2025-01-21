import {Alert, Tab, Tabs} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import type {Clone} from "app/view/cluster/types";
import {ResourceDetailCaption, Router, useUrlTabs} from "app/view/share";
import {DetailLayout} from "app/view/cluster/share";

import {CloneDetail} from "./CloneDetail";
import {CloneMeta} from "./CloneMeta";
import {ClonePageToolbar} from "./ClonePageToolbar";

const {currentClone} = testMarks.cluster.resources;

const {tabs} = currentClone;

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

export const ClonePage = ({clone}: {clone: Clone}) => {
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as (keyof typeof tabMap)[],
  );
  if (clone.member.itemType !== "fence-device") {
    return (
      <DetailLayout
        caption={
          <ResourceDetailCaption
            resourceId={clone.id}
            type="clone"
            {...currentClone.id.mark}
          />
        }
        tabs={
          <Tabs activeKey={currentTab} onSelect={onSelect} {...tabs.mark}>
            {Object.values(tabMap)}
          </Tabs>
        }
        toolbar={<ClonePageToolbar clone={clone} />}
        {...currentClone.mark}
      >
        <Router base={matchedContext}>
          {currentTab === "detail" && (
            <CloneDetail
              id={clone.id}
              member={clone.member}
              issueList={clone.issueList}
            />
          )}
          {currentTab === "meta" && <CloneMeta clone={clone} />}
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
          {...currentClone.id.mark}
        />
      }
      {...currentClone.mark}
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
