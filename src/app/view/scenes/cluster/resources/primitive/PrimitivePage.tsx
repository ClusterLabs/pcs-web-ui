import React from "react";
import { useSelector } from "react-redux";

import { selectors, types } from "app/store";
import { analyzeRoutes, join, useMatch } from "app/view/utils";
import {
  DetailLayout,
  ResourceDetailCaption,
  UrlTabs,
  useGroupDetailViewContext,
} from "app/view/common";

import { ConstraintListResource } from "../constraints";
import { PrimitiveAttrsView } from "./attributes";
import { PrimitiveDetail } from "./PrimitiveDetail";
import { useResourceAgent } from "./useResourceAgent";

export const PrimitivePage = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, primitive.id);

  const { tab, urlMap } = analyzeRoutes("Detail", {
    Detail: useMatch({ path: resourceUrlPrefix, exact: true }),
    Attributes: useMatch(join(resourceUrlPrefix, "attributes")),
    Constraints: useMatch(join(resourceUrlPrefix, "constraints")),
  });

  // Agent is loaded here to load neccessary data as soon as possible. Ideally
  // user doesn't need to wait when he needs it.
  const cluster = useSelector(selectors.getCluster);
  useResourceAgent(cluster.urlName, primitive.agentName);

  return (
    <DetailLayout
      caption={
        <ResourceDetailCaption
          resourceId={primitive.id}
          type={primitive.type}
        />
      }
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
      data-test={`resource-detail ${primitive.id}`}
    >
      {tab === "Detail" && <PrimitiveDetail primitive={primitive} />}
      {tab === "Attributes" && <PrimitiveAttrsView primitive={primitive} />}
      {tab === "Constraints" && <ConstraintListResource resource={primitive} />}
    </DetailLayout>
  );
};
