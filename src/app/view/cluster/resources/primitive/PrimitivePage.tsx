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

const tabList = ["detail", "attributes", "utilization", "meta"] as const;

export const PrimitivePage = ({ primitive }: { primitive: Primitive }) => {
  const { currentTab, matchedContext } = useUrlTabs(tabList);

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
      tabs={<UrlTabs tabList={tabList} currentTab={currentTab} />}
      data-test={`resource-detail ${primitive.id}`}
      toolbar={<PrimitivePageToolbar primitive={primitive} />}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <PrimitiveDetail primitive={primitive} />}
        {currentTab === "attributes" && (
          <PrimitiveAttrsView primitive={primitive} />
        )}
        {currentTab === "utilization" && (
          <UtilizationView utilizationParams={primitive.utilization} />
        )}
        {currentTab === "meta" && (
          <NVPairListView nvPairListView={primitive.metaAttributes} />
        )}
      </Router>
    </DetailLayout>
  );
};
