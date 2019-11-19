import React from "react";
import { useRouteMatch } from "react-router";
import { useSelector } from "react-redux";
import { selectors as clusterSelector } from "app/services/cluster";

import { Primitive } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import {
  UrlTabs,
  DetailLayout,
  ResourceDetailCaption,
} from "app/common/components";
import {
  PrimitiveAttributes,
  PrimitiveDetail,
  useResourceAgent,
} from "app/scenes/resource-primitive";

const ResourceDetailPrimitive = ({ primitive, urlPrefix, onClose }: {
  primitive: Primitive;
  urlPrefix: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
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
    <DetailLayout
      onClose={onClose}
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
    </DetailLayout>
  );
};

export default ResourceDetailPrimitive;
