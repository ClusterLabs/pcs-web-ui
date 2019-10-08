import React from "react";
import { useDispatch } from "react-redux";
import { Alert } from "@patternfly/react-core";

import { ResourceTreeItem } from "app/services/cluster/types";
import { actions as resourceDetailAction } from "app/scenes/resource-detail";
import * as url from "app/common/urls";

const ResourceAttributes = ({ clusterUrlName, resourceTreeItem }: {
  clusterUrlName: string,
  resourceTreeItem: ResourceTreeItem;
}) => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch<resourceDetailAction.CorrectWrongResourceTypeView>({
      type: "RESOURCE_TREE_ITEM_TYPE.CORRECT_VIEW",
      payload: {
        resourceId: resourceTreeItem.id,
        viewName: "attributes",
        url: url.resourcesDetail(clusterUrlName, resourceTreeItem.id),
      },
    });
  });

  if (resourceTreeItem.itemType !== "resource") {
    return (
      <Alert
        isInline
        variant="info"
        title={`No view "attributes" for type "${resourceTreeItem.itemType}"`}
      />
    );
  }

  return (
    <div>
        Attributes
    </div>
  );
};

export default ResourceAttributes;
