import {PageSection} from "@patternfly/react-core";

import {LauncherItem} from "app/view/share/toolbar/types";

import {LaunchersToolbar} from "./LaunchersToolbar";

export const ClusterToolbar = ({
  toolbarName,
  buttonsItems = [],
  dropdownItems = [],
  before,
  after,
}: {
  toolbarName: string;
  buttonsItems?: LauncherItem[];
  dropdownItems?: LauncherItem[];
  after?: React.ReactNode;
  before?: React.ReactNode;
}) => {
  return (
    <PageSection
      variant="light"
      style={{paddingTop: "0"}}
      data-test="cluster-section-toolbar"
    >
      <LaunchersToolbar
        toolbarName={toolbarName}
        buttonsItems={buttonsItems}
        dropdownItems={dropdownItems}
        after={after}
        before={before}
      />
    </PageSection>
  );
};
