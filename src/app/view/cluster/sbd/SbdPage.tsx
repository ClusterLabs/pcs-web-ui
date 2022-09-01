import {
  ActionList,
  Grid,
  GridItem,
  PageSection,
} from "@patternfly/react-core";

import { selectors } from "app/store";
import {
  ActionTaskLauncher,
  ClusterSectionToolbar,
  useClusterSelector,
} from "app/view/share";

import * as task from "./task";
import { SbdServiceStatus } from "./SbdServiceStatus";
import { SbdConfiguration } from "./SbdConfiguration";
import { SbdOnNodes } from "./SbdOnNodes";

const optionToValues = <VALUE extends string>(
  option: string | undefined,
  values: VALUE[],
): VALUE | "DEFAULT" => values.find(v => v === option) ?? "DEFAULT";

const extractTimeoutAction = <VALUE extends string>(
  option: string | undefined,
  values: VALUE[],
): VALUE | "DEFAULT" => {
  const parts = (option ?? "").split(",");
  return values.find(v => parts.includes(v)) ?? "DEFAULT";
};

export const SbdPage = () => {
  const [sbdConfig] = useClusterSelector(selectors.getClusterSbdConfig);
  const [cluster] = useClusterSelector(selectors.getCluster);

  const configureOpenPayload = {
    delayStart: optionToValues(sbdConfig.SBD_DELAY_START, ["yes", "no"]),
    startmode: optionToValues(sbdConfig.SBD_STARTMODE, ["always", "clean"]),
    watchdogTimeout: sbdConfig.SBD_WATCHDOG_TIMEOUT ?? "",
    timeoutActionFlush: extractTimeoutAction(sbdConfig.SBD_TIMEOUT_ACTION, [
      "flush",
      "noflush",
    ]),
    timeoutAction: extractTimeoutAction(sbdConfig.SBD_TIMEOUT_ACTION, [
      "reboot",
      "crashdump",
      "off",
    ]),
    watchdogDict: Object.values(cluster.nodeList).reduce(
      (watchdogMap, node) => {
        let watchdog = "";
        if (node.status !== "DATA_NOT_PROVIDED") {
          watchdog = node.sbd?.watchdog ?? "";
        }
        return { ...watchdogMap, [node.name]: watchdog };
      },
      {},
    ),
  };

  return (
    <>
      <ClusterSectionToolbar>
        <ActionList>
          <ActionTaskLauncher
            taskComponent={task.configure.SbdConfigureTask}
            openArgs={[configureOpenPayload]}
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
            <SbdOnNodes />
          </GridItem>
        </Grid>
      </PageSection>
    </>
  );
};
