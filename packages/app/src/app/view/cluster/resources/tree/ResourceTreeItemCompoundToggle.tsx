import {DataListToggle} from "@patternfly/react-core";

import {useDispatch} from "app/view/share";
import {useClusterSources} from "app/view/cluster/share";

export const ResourceTreeItemCompoundToggle = ({
  resourceId,
}: {
  resourceId: string;
}) => {
  const dispatch = useDispatch();
  const {
    uiState: {resourceOpenedItems},
    loadedCluster: {clusterName},
  } = useClusterSources();
  const expanded = resourceOpenedItems.includes(resourceId);
  return (
    <DataListToggle
      data-test="resource-tree-item-toggle"
      id={`resource-tree-toggle-${resourceId}`}
      isExpanded={expanded}
      onClick={() =>
        dispatch({
          type: "RESOURCE.TREE.ITEM.TOGGLE",
          key: {clusterName},
          payload: {itemId: resourceId},
        })
      }
    />
  );
};
