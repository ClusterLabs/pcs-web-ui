import React from "react";
import { useRouteMatch } from "react-router";

import { Resource } from "app/services/cluster/types";
import { tabRoutes, join } from "app/common/utils";
import { UrlTabs } from "app/common/components";
import { PrimitiveAttributesPage } from "app/scenes/primitive-attributes";

import ResourceDetailLayout from "./ResourceDetailLayout";

const ResourceDetailPrimitive = ({ primitive, urlPrefix, closeUrl }: {
  primitive: Resource;
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
        <>
          <strong>{`${primitive.id}: `}</strong>
          <span>
            {`${primitive.type} (${primitive.class}:${primitive.provider})`}
          </span>
        </>
      )}
      tabs={<UrlTabs tabSettingsMap={urlMap} currentTab={tab} />}
    >
      {tab === "Detail" && (
        <>Primitive detail</>
      )}
      {tab === "Attributes" && (
        <PrimitiveAttributesPage primitive={primitive} />
      )}
    </ResourceDetailLayout>
  );
};

export default ResourceDetailPrimitive;
