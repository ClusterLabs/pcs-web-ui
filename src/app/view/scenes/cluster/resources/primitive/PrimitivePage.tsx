import React from "react";
import { useRouteMatch } from "react-router";
import { useSelector } from "react-redux";

import { selectors, types } from "app/store";
import { tabRoutes, join } from "app/view/utils";
import { UrlTabs, DetailLayout, ResourceDetailCaption } from "app/view/common";

import { ConstraintListResource } from "../constraints";
import PrimitiveAttributes from "./PrimitiveAttributes";
import PrimitiveDetail from "./PrimitiveDetail";
import useResourceAgent from "./useResourceAgent";

const PrimitivePage = ({ primitive, urlPrefix, onClose }: {
  primitive: types.cluster.Primitive;
  urlPrefix: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
}) => {
  const urlMap = {
    Detail: join(urlPrefix),
    Attributes: join(urlPrefix, "attributes"),
    Constraints: join(urlPrefix, "constraints"),
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
      {tab === "Constraints" && (
        <ConstraintListResource resource={primitive} />
      )}

    </DetailLayout>
  );
};

export default PrimitivePage;
