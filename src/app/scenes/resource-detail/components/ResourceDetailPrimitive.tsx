import React from "react";
import { useRouteMatch } from "react-router";

import { Primitive } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import { UrlTabs } from "app/common/components";
import {
  PrimitiveAttributes,
  PrimitiveDetail,
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
