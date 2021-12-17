import { ActionList, ActionListItem } from "@patternfly/react-core";

import {
  ClusterSectionToolbar,
  GroupDetailView,
  useClusterSelector,
} from "app/view/share";
import { selectors } from "app/store";

import { ResourceDetailPage } from "./ResourceDetailPage";
import { ResourceTree } from "./tree/ResourceTree";
import {
  ResourcCreateGroupToolbarItem,
  ResourceCreateToolbarItem,
} from "./task";

export const ResourcesPage = () => {
  const [cluster] = useClusterSelector(selectors.getCluster);
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <ResourceCreateToolbarItem />
          </ActionListItem>
          <ActionListItem>
            <ResourcCreateGroupToolbarItem variant="secondary" />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>
      <GroupDetailView
        groupCard={<ResourceTree resourceTree={cluster.resourceTree} />}
        detailCard={<ResourceDetailPage />}
      />
    </>
  );
};
