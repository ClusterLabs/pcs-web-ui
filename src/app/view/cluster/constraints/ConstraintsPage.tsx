import React from "react";
import {
  ActionList,
  ActionListItem,
  Card,
  CardBody,
  PageSection,
} from "@patternfly/react-core";

import { ClusterSectionToolbar } from "app/view/share";

import { ConstraintFilteredList } from "./ConstraintFilteredList";
import {
  ConstraintCreateLocationToolbarItem,
  ConstraintCreateOrderSetToolbarItem,
  ConstraintCreateOrderToolbarItem,
} from "./task";

export const ConstraintsPage: React.FC<{ clusterName: string }> = ({
  clusterName,
}) => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <ConstraintCreateLocationToolbarItem />
          </ActionListItem>
          <ActionListItem>
            <ConstraintCreateOrderToolbarItem variant="secondary" />
          </ActionListItem>
          <ActionListItem>
            <ConstraintCreateOrderSetToolbarItem variant="secondary" />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>
      <PageSection>
        <Card>
          <CardBody>
            <ConstraintFilteredList clusterName={clusterName} />
          </CardBody>
        </Card>
      </PageSection>
    </>
  );
};
