import {Grid, GridItem, PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Card, ClusterToolbar, TaskOpenArgs} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";

import {selectSbdConfig} from "./select";
import * as task from "./task";
import {SbdServiceStatus} from "./SbdServiceStatus";
import {SbdConfiguration} from "./SbdConfiguration";
import {SbdOnNodes} from "./SbdOnNodes";

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

const {sbd, sbdToolbar} = testMarks.cluster;
export const SbdPage = () => {
  const {nodeList} = useLoadedCluster();
  const sbdConfig = selectSbdConfig(nodeList);

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
    watchdogDict: Object.values(nodeList).reduce((watchdogMap, node) => {
      let watchdog = "";
      if (node.status !== "DATA_NOT_PROVIDED") {
        watchdog = node.sbd?.watchdog ?? "";
      }
      return {...watchdogMap, [node.name]: watchdog};
    }, {}),
  };

  const configureOpenArgs: TaskOpenArgs<typeof task.configure.useTask> = [
    configureOpenPayload,
  ];

  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "configure-SBD",
            task: {
              component: task.configure.SbdConfigureTask,
              useTask: task.configure.useTask,
              openArgs: configureOpenArgs,
            },
            ...sbdToolbar.configureSbd.mark,
          },
          {
            name: "disable-SBD",
            task: {
              component: task.disable.SbdDisableTask,
              useTask: task.disable.useTask,
            },
            ...sbdToolbar.disableSbd.mark,
          },
        ]}
        {...sbdToolbar.mark}
      />

      <PageSection {...testMarks.cluster.mark}>
        <Grid hasGutter {...sbd.mark}>
          <GridItem span={12}>
            <Card title="SBD service status">
              <SbdServiceStatus />
            </Card>
          </GridItem>
          <GridItem span={6}>
            <Card title="SBD configuration ">
              <SbdConfiguration />
            </Card>
          </GridItem>
          <GridItem span={6}>
            <Card title="SBD per node ">
              <SbdOnNodes />
            </Card>
          </GridItem>
        </Grid>
      </PageSection>
    </>
  );
};
