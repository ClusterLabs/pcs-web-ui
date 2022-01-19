import React from "react";
import {
  ActionList,
  ActionListItem,
  PageSection,
} from "@patternfly/react-core";

import { ClusterSectionToolbar } from "app/view/share";

import { PermissionAddToolbarItem } from "./task/PermissionAddToolbarItem";
import { PermissionsTable } from "./PermissionsTable";

export const ClusterPermissionsPage = () => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <PermissionAddToolbarItem />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>

      <PageSection>
        <PermissionsTable />
      </PageSection>
    </>
  );
};
