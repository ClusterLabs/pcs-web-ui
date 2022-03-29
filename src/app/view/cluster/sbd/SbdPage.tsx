import {
    ActionList,
    ActionListItem,
    PageSection,
  } from "@patternfly/react-core";
  
  import { ClusterSectionToolbar } from "app/view/share";
  
  import { SbdEnableToolbarItem } from "./task/SbdEnable/SbdEnableToolbarItem";
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
              <SbdEnableToolbarItem />
            </ActionListItem>
            <ActionListItem>
              <SbdDisableToolbarItem />
            </ActionListItem>
          </ActionList>
        </ClusterSectionToolbar>
  
        <PageSection>
          <SbdServiceStatus />
        </PageSection>
        <PageSection>
          <SbdConfiguration />
        </PageSection>
        <PageSection> 
          <SbdWatchdogs />
        </PageSection>
      </>
    );
  };
  