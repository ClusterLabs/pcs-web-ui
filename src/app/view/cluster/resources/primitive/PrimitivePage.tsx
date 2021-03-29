import React from "react";

import { Primitive } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  UrlTabs,
  UtilizationView,
  join,
  useGroupDetailViewContext,
  useMatch,
  useRoutesAnalysis,
} from "app/view/share";

import { PrimitiveAttrsView } from "./attributes";
import { PrimitiveDetail } from "./PrimitiveDetail";
import { useClusterResourceAgent } from "./useResourceAgent";
import { PrimitivePageToolbar } from "./PrimitivePageToolbar";

export const PrimitivePage = ({ primitive }: { primitive: Primitive }) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const resourceUrlPrefix = join(urlPrefix, primitive.id);

  const { tab, urlMap } = useRoutesAnalysis("Detail", {
    Detail: useMatch({ path: resourceUrlPrefix, exact: true }),
    Attributes: useMatch(join(resourceUrlPrefix, "attributes")),
    Utilization: useMatch(join(resourceUrlPrefix, "utilization")),
    Meta: useMatch(join(resourceUrlPrefix, "meta-attributes")),
  });

  // Agent is loaded here to load neccessary data as soon as possible. Ideally
  // user doesn't need to wait when he needs it.
  useClusterResourceAgent(primitive.agentName);

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
      toolbar={<PrimitivePageToolbar primitive={primitive} />}
    >
      {tab === "Detail" && <PrimitiveDetail primitive={primitive} />}
      {tab === "Attributes" && <PrimitiveAttrsView primitive={primitive} />}
      {tab === "Utilization" && (
        <UtilizationView utilizationParams={primitive.utilization} />
      )}
      {tab === "Meta" && (
        <NVPairListView nvPairListView={primitive.metaAttributes} />
      )}
    </DetailLayout>
  );
};
