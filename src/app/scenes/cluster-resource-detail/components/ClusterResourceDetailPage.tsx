import React from "react";
import {
  Level,
  LevelItem,
  Button,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";
import { push } from "connected-react-router";
import { useDispatch } from "react-redux";

import { ClusterPage, useClusterState } from "app/services/cluster";

import { ResourceList } from "app/scenes/cluster-resource-list/";

const ClusterResourceDetailPage = ({ clusterUrlName, resourceUrlName }: {
  clusterUrlName: string,
  resourceUrlName: string,
}) => {
  const { cluster, dataLoaded } = useClusterState(clusterUrlName);
  const dispatch = useDispatch();
  return (
    <ClusterPage
      clusterUrlName={clusterUrlName}
      clusterDataLoaded={dataLoaded}
      currentTab="resources"
      pageSectionClassName="ha-m-full-height pf-m-fill"
    >
      <div className="pf-l-flex pf-u-align-items-flex-start pf-u-h-100">
        <div className="pf-c-card ha-c-panel__tree-view">
          <ResourceList
            resourceList={cluster.resourceList}
            createResourceDetailUrl={
              ResourceList.createResourceDetailUrl(clusterUrlName)
            }
          />
        </div>
        <div className="pf-c-card pf-m-flex-1 ha-c-panel__details-view">
          <Level>
            <LevelItem />
            <LevelItem>
              <Button
                variant="plain"
                aria-label="Close panel"
                onClick={
                  (e: React.SyntheticEvent) => {
                    e.preventDefault();
                    dispatch(push(`/cluster/${clusterUrlName}/resources`));
                  }
                }
              >
                <TimesIcon />
              </Button>
            </LevelItem>
          </Level>
        </div>
      </div>
    </ClusterPage>
  );
};

export default ClusterResourceDetailPage;
