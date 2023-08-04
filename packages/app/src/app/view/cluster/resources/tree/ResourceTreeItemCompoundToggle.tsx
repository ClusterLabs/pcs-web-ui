import {DataListToggle} from "@patternfly/react-core";

import {useDispatch} from "app/view/share";
import {useClusterSources} from "app/view/cluster/share";

export const ResourceTreeItemCompoundToggle = (props: {
  resourceId: string;
  "data-test": string;
}) => {
  const dispatch = useDispatch();
  const {
    uiState: {resourceOpenedItems},
    loadedCluster: {clusterName},
  } = useClusterSources();
  const expanded = resourceOpenedItems.includes(props.resourceId);
  return (
    <DataListToggle
      id={`resource-tree-toggle-${props.resourceId}`}
      isExpanded={expanded}
      onClick={() =>
        dispatch({
          type: "RESOURCE.TREE.ITEM.TOGGLE",
          key: {clusterName},
          payload: {itemId: props.resourceId},
        })
      }
      data-test={props["data-test"]}
    />
  );
};
