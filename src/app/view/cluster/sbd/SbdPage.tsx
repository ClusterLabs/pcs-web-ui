import {
  ActionList,
  ActionListItem,
  Grid,
  GridItem,
  PageSection,
} from "@patternfly/react-core";

import { ClusterSectionToolbar } from "app/view/share";

import { SbdConfigureToolbarItem } from "./task/SbdConfigure/SbdConfigureToolbarItem";
import { SbdDisableToolbarItem } from "./task/SbdDisable/SbdDisableToolbarItem";
import { SbdServiceStatus } from "./SbdServiceStatus";
import { SbdConfiguration } from "./SbdConfiguration";
import { SbdWatchdogs } from "./SbdWatchdogs";

export const SbdPage = () => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionListItem>
            <SbdConfigureToolbarItem />
          </ActionListItem>
          <ActionListItem>
            <SbdDisableToolbarItem />
          </ActionListItem>
        </ActionList>
      </ClusterSectionToolbar>

      <PageSection>
        <Grid hasGutter>
          <GridItem span={12}>
            <SbdServiceStatus />
          </GridItem>
          <GridItem span={6}>
            <SbdConfiguration />
          </GridItem>
          <GridItem span={6}>
            <SbdWatchdogs />
          </GridItem>
        </Grid>
      </PageSection>
    </>
  );
};
