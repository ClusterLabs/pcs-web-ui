import React from "react";
import { useRouteMatch } from "react-router";
import { useSelector } from "react-redux";

import { selectors, types } from "app/store";
import { tabRoutes, join } from "app/view/utils";
import {
  UrlTabs, ResourceDetailCaption, useGroupDetailViewContext, DetailLayout,
} from "app/view/common";


import { ConstraintListResource } from "../constraints";
import { PrimitiveAttrsView } from "./attributes";
import { PrimitiveDetail } from "./PrimitiveDetail";
import { useResourceAgent } from "./useResourceAgent";

export const PrimitivePage = ({ primitive }: {
  primitive: types.cluster.Primitive;
}) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, primitive.id);
  const urlMap = {
    Detail: resourceUrlPrefix,
    Attributes: join(resourceUrlPrefix, "attributes"),
    Constraints: join(resourceUrlPrefix, "constraints"),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
    Attributes: useRouteMatch(urlMap.Attributes),
    Constraints: useRouteMatch(urlMap.Constraints),
  });

  // Agent is loaded here to load neccessary data as soon as possible. Ideally
  // user doesn't need to wait when he needs it.
  const cluster = useSelector(selectors.getCluster);
  useResourceAgent(cluster.urlName, primitive.agentName);

  return (
    <DetailLayout
      caption={(
        <ResourceDetailCaption
          resourceId={primitive.id}
          type={primitive.type}
        />
      )}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && <PrimitiveDetail primitive={primitive} />}
      {tab === "Attributes" && <PrimitiveAttrsView primitive={primitive} />}
      {tab === "Constraints" && <ConstraintListResource resource={primitive} />}
    </DetailLayout>
  );
};
