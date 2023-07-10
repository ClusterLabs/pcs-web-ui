import {PageSection} from "@patternfly/react-core";

import {LauncherItem} from "app/view/share/toolbar/types";

import {LaunchersToolbar} from "./LaunchersToolbar";

export const ClusterToolbar = (props: {
  toolbarName: string;
  buttonsItems?: LauncherItem[];
  dropdownItems?: LauncherItem[];
  after?: React.ReactNode;
  before?: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <PageSection
      variant="light"
      style={{paddingTop: "0"}}
      data-test={props["data-test"]}
    >
      <LaunchersToolbar
        toolbarName={props.toolbarName}
        buttonsItems={props.buttonsItems}
        dropdownItems={props.dropdownItems}
        after={props.after}
        before={props.before}
      />
    </PageSection>
  );
};
