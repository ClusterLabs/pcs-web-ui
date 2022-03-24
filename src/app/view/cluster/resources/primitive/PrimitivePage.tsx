import { Primitive } from "app/view/cluster/types";
import {
  DetailLayout,
  NVPairListView,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  UtilizationView,
  useUrlTabs,
} from "app/view/share";

import { PrimitiveAttrsView } from "./attributes";
import { PrimitiveDetail } from "./PrimitiveDetail";
import { useClusterResourceAgent } from "./useResourceAgent";
import { PrimitivePageToolbar } from "./PrimitivePageToolbar";

export const primitivePageTabList = [
  "detail",
  "attributes",
  "utilization",
  "meta",
] as const;

export const PrimitivePage = ({ primitive }: { primitive: Primitive }) => {
  const { currentTab, matchedContext } = useUrlTabs(primitivePageTabList);

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
      tabs={
        <UrlTabs
          tabList={primitivePageTabList}
          currentTab={currentTab}
          data-test="primitive"
        />
      }
      data-test={`resource-detail ${primitive.id}`}
      toolbar={<PrimitivePageToolbar primitive={primitive} />}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <PrimitiveDetail primitive={primitive} />}
        {currentTab === "attributes" && (
          <PrimitiveAttrsView primitive={primitive} />
        )}
        {currentTab === "utilization" && (
          <UtilizationView
            utilizationAttrs={primitive.utilization}
            owner={{
              type: "resource",
              id: primitive.id,
            }}
          />
        )}
        {currentTab === "meta" && (
          <NVPairListView nvPairListView={primitive.metaAttributes} />
        )}
      </Router>
    </DetailLayout>
  );
};
