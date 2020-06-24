import React from "react";

import { types } from "app/store";
import { join, useMatch, useRoutesAnalysis } from "app/view/utils";
import {
  DetailLayout,
  ResourceDetailCaption,
  UrlTabs,
  useGroupDetailViewContext,
} from "app/view/common";

import { CloneDetail } from "./CloneDetail";

export const ClonePage = ({ clone }: { clone: types.cluster.Clone }) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, clone.id);
  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: resourceUrlPrefix, exact: true }),
  });
  return (
    <DetailLayout
      caption={<ResourceDetailCaption resourceId={clone.id} type="clone" />}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
      data-test={`resource-detail ${clone.id}`}
    >
      {tab === "Detail" && <CloneDetail clone={clone} />}
    </DetailLayout>
  );
};
