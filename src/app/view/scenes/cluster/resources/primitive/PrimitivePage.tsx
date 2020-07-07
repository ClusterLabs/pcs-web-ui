import React from "react";

import { types } from "app/store";
import { join, useMatch, useRoutesAnalysis } from "app/view/utils";
import {
  DetailLayout,
  ResourceDetailCaption,
  UrlTabs,
  useGroupDetailViewContext,
} from "app/view/common";
import { useSelectedClusterName } from "app/view/scenes/cluster";

import { PrimitiveAttrsView } from "./attributes";
import { PrimitiveUtilizationView } from "./utilization";
import { PrimitiveDetail } from "./PrimitiveDetail";
import { useResourceAgent } from "./useResourceAgent";

export const PrimitivePage = ({
  primitive,
}: {
  primitive: types.cluster.Primitive;
}) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, primitive.id);

  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: resourceUrlPrefix, exact: true }),
    Attributes: useMatch(join(resourceUrlPrefix, "attributes")),
    Utilization: useMatch(join(resourceUrlPrefix, "utilization")),
  });

  // Agent is loaded here to load neccessary data as soon as possible. Ideally
  // user doesn't need to wait when he needs it.
  useResourceAgent(useSelectedClusterName(), primitive.agentName);

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
      {tab === "Utilization" && (
        <PrimitiveUtilizationView primitive={primitive} />
      )}
    </DetailLayout>
  );
};
