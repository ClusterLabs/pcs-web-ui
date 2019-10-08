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
import ResourceDetailViewClose from "./ResourceDetailViewClose";
import ResourceDetailViewCaption from "./ResourceDetailViewCaption";

const ResourceDetailViewLayout = (
  {
    cluster,
    resourceUrlName,
    tabs,
    children,
  }: {
    cluster: ClusterState,
    resourceUrlName: string,
    tabs: (
      (resource: ResourceTreeItem) => JSX.Element|JSX.Element[]|string|null
    ),
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
      {resource && tabs && (() => {
        const resourceTabs = tabs(resource);
        return !resourceTabs ? null : <StackItem>{resourceTabs}</StackItem>;
      })()}
      <StackItem>
        {!resource && `Resource "${resourceUrlName}" does not exist.`}
        {resource && children(resource)}
      </StackItem>
    </Stack>
  );
};

export default ResourceDetailViewLayout;
