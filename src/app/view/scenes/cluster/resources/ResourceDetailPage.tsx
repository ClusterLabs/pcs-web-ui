import React from "react";
import { useSelector } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { selectors } from "app/store";
import { DetailLayout } from "app/view/common";

import { ClonePage } from "./clone";
import { GroupPage } from "./group";
import { PrimitivePage } from "./primitive";

const ResourceDetailPage = ({ resourceUrlName, urlPrefix, onClose }: {
  resourceUrlName: string;
  urlPrefix: string;
  onClose: React.ComponentProps<typeof DetailLayout>["onClose"],
}) => {
  const resourceTreeItem = useSelector(
    selectors.getSelectedResource(resourceUrlName),
  );

  if (!resourceTreeItem) {
    return (
      <DetailLayout
        onClose={onClose}
        caption={<strong>{resourceUrlName}</strong>}
      >
        <Alert
          isInline
          variant="danger"
          title={`Resource "${resourceUrlName}" does not exist.`}
        />
      </DetailLayout>
    );
  }

  switch (resourceTreeItem.itemType) {
    case "primitive": return (
      <PrimitivePage
        primitive={resourceTreeItem}
        urlPrefix={urlPrefix}
        onClose={onClose}
      />
    );
    case "group": return (
      <GroupPage
        group={resourceTreeItem}
        urlPrefix={urlPrefix}
        onClose={onClose}
      />
    );
    case "clone": default: return (
      <ClonePage
        clone={resourceTreeItem}
        urlPrefix={urlPrefix}
        onClose={onClose}
      />
    );
  }
};

export default ResourceDetailPage;
