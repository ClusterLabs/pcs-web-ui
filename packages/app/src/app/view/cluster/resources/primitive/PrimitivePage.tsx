import {Tab, Tabs} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Primitive} from "app/view/cluster/types";
import {
  DetailLayout,
  ResourceDetailCaption,
  Router,
  useUrlTabs,
} from "app/view/share";

import {PrimitiveAttrsView} from "./attributes";
import {PrimitiveDetail} from "./PrimitiveDetail";
import {useClusterResourceAgent} from "./useResourceAgent";
import {PrimitivePageToolbar} from "./PrimitivePageToolbar";
import {PrimitiveMeta} from "./PrimitiveMeta";
import {PrimitiveUtilization} from "./PrimitiveUtilization";

const {currentPrimitive} = testMarks.cluster.resources;
const {tabs} = currentPrimitive;

const tabMap = {
  detail: (
    <Tab
      eventKey="detail"
      key="detail"
      title={"Detail"}
      {...tabs.detail.mark}
    />
  ),
  attributes: (
    <Tab
      eventKey="attributes"
      key="attributes"
      title="Attributes"
      {...tabs.attributes.mark}
    />
  ),
  utilization: (
    <Tab
      eventKey="utilization"
      key="utilization"
      title="Utilization"
      {...tabs.utilization.mark}
    />
  ),
  meta: <Tab eventKey="meta" key="meta" title="Meta" {...tabs.meta.mark} />,
};

export const PrimitivePage = ({primitive}: {primitive: Primitive}) => {
  const {currentTab, matchedContext, onSelect} = useUrlTabs(
    Object.keys(tabMap) as (keyof typeof tabMap)[],
  );

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
        <Tabs activeKey={currentTab} onSelect={onSelect} {...tabs.mark}>
          {Object.values(tabMap)}
        </Tabs>
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
