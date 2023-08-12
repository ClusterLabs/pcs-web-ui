import {testMarks} from "app/view/dataTest";
import {Primitive} from "app/view/cluster/types";
import {
  DetailLayout,
  ResourceDetailCaption,
  Router,
  UrlTabs,
  useUrlTabs,
} from "app/view/share";

import {PrimitiveAttrsView} from "./attributes";
import {PrimitiveDetail} from "./PrimitiveDetail";
import {useClusterResourceAgent} from "./useResourceAgent";
import {PrimitivePageToolbar} from "./PrimitivePageToolbar";
import {PrimitiveMeta} from "./PrimitiveMeta";
import {PrimitiveUtilization} from "./PrimitiveUtilization";

export const primitivePageTabList = [
  "detail",
  "attributes",
  "utilization",
  "meta",
] as const;

const {currentPrimitive} = testMarks.cluster.resources;

export const PrimitivePage = ({primitive}: {primitive: Primitive}) => {
  const {currentTab, matchedContext} = useUrlTabs(primitivePageTabList);

  // Agent is loaded here to load necessary data as soon as possible. Ideally
  // user doesn't need to wait when he needs it.
  useClusterResourceAgent(primitive.agentName);

  return (
    <DetailLayout
      caption={
        <ResourceDetailCaption
          resourceId={primitive.id}
          type={primitive.type}
          {...currentPrimitive.id.mark}
        />
      }
      tabs={
        <UrlTabs
          tabList={primitivePageTabList}
          currentTab={currentTab}
          data-test="primitive"
        />
      }
      {...currentPrimitive.mark}
      toolbar={<PrimitivePageToolbar primitive={primitive} />}
    >
      <Router base={matchedContext}>
        {currentTab === "detail" && <PrimitiveDetail primitive={primitive} />}
        {currentTab === "attributes" && (
          <PrimitiveAttrsView primitive={primitive} />
        )}
        {currentTab === "utilization" && (
          <PrimitiveUtilization primitive={primitive} />
        )}
        {currentTab === "meta" && <PrimitiveMeta primitive={primitive} />}
      </Router>
    </DetailLayout>
  );
};
