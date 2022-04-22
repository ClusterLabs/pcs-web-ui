import { ActionList, Grid, GridItem, PageSection } from "@patternfly/react-core";

import { ActionTaskLauncher, ClusterSectionToolbar } from "app/view/share";

import * as task from "./task";
import { SbdServiceStatus } from "./SbdServiceStatus";
import { SbdConfiguration } from "./SbdConfiguration";
import { SbdWatchdogs } from "./SbdWatchdogs";

export const SbdPage = () => {
  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.configure.SbdConfigureTask}
            useTask={task.configure.useTask}
            label="Configure SBD"
          />
          <ActionTaskLauncher
            taskComponent={task.disable.SbdDisableTask}
            useTask={task.disable.useTask}
            label="Disable SBD"
            variant="secondary"
          />
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
