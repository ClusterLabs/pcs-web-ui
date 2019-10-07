import React from "react";
import { useSelector } from "react-redux";
import {
  Level,
  LevelItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";

import { ClusterState, ResourceTreeItem } from "app/services/cluster/types";

import * as selector from "../selectors";
import ResourceDetailSectionTabs from "./ResourceDetailSectionTabs";
import ResourceDetailViewClose from "./ResourceDetailViewClose";
import ResourceDetailViewCaption from "./ResourceDetailViewCaption";

const ResourceDetailViewLayout = (
  {
    cluster,
    resourceUrlName,
    currentTab,
    children,
  }: {
    cluster: ClusterState,
    resourceUrlName: string,
    currentTab:
      React.ComponentProps<typeof ResourceDetailSectionTabs>["currentTab"]
    ,
    children: (resource: ResourceTreeItem) => JSX.Element|JSX.Element[]|string,
  },
) => {
  const resource = useSelector(selector.getSelectedResource(resourceUrlName));
  return (
    <Stack gutter="md" className="pf-u-m-md">
      <StackItem>
        <Level>
          <LevelItem>
            {!resource && resourceUrlName}
            {resource && <ResourceDetailViewCaption resource={resource} />}
          </LevelItem>
          <LevelItem>
            <ResourceDetailViewClose clusterUrlName={cluster.urlName} />
          </LevelItem>
        </Level>
      </StackItem>
      <StackItem>
        {resource && (
          <ResourceDetailSectionTabs
            clusterUrlName={cluster.urlName}
            resourceUrlName={resource.id}
            currentTab={currentTab}
          />
        )}
      </StackItem>
      <StackItem>
        {!resource && `Resource "${resourceUrlName}" does not exist.`}
        {resource && children(resource)}
      </StackItem>
    </Stack>
  );
};

export default ResourceDetailViewLayout;
