import React from "react";
import { useRouteMatch } from "react-router";
import { useSelector } from "react-redux";
import { selectors as clusterSelector } from "app/services/cluster";

import { Primitive } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import { UrlTabs } from "app/common/components";
import {
  PrimitiveAttributes,
  PrimitiveDetail,
  useResourceAgent,
} from "app/scenes/resource-primitive";

import ResourceDetailLayout from "./ResourceDetailLayout";
import ResourceDetailCaption from "./ResourceDetailCaption";

const ResourceDetailPrimitive = ({ primitive, urlPrefix, closeUrl }: {
  primitive: Primitive;
  urlPrefix: string;
  closeUrl: string;
}) => {
  const urlMap = {
    Detail: join(urlPrefix),
    Attributes: join(urlPrefix, "attributes"),
  };
  const { tab } = tabRoutes.selectCurrent<keyof typeof urlMap>("Detail", {
    Detail: useRouteMatch({ path: urlMap.Detail, exact: true }),
    Attributes: useRouteMatch(urlMap.Attributes),
  });

  // Agent is loaded here to load neccessary data as soon as possible. Ideally
  // user doesn't need to wait when he needs it.
  const cluster = useSelector(clusterSelector.getCluster);
  useResourceAgent(cluster.urlName, primitive.agentName);

  return (
    <ResourceDetailLayout
      closeUrl={closeUrl}
      caption={(
        <ResourceDetailCaption
          resourceId={primitive.id}
          type={primitive.type}
        />
      )}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && (
        <PrimitiveDetail primitive={primitive} />
      )}
      {tab === "Attributes" && (
        <PrimitiveAttributes primitive={primitive} />
      )}
    </ResourceDetailLayout>
  );
};

export default ResourceDetailPrimitive;
