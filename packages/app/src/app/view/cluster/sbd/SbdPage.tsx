import {Grid, GridItem, PageSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";
import {Card, ClusterToolbar} from "app/view/share";
import {useLoadedCluster} from "app/view/cluster/share";
import {useOpenTask} from "app/view/task";

import {selectSbdConfig} from "./select";
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
  const {nodeList, clusterName} = useLoadedCluster();
  const openTask = useOpenTask();
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

  return (
    <>
      <ClusterToolbar
        buttonsItems={[
          {
            name: "configure-SBD",
            run: () =>
              openTask("sbdConfigure", {
                type: "CLUSTER.SBD.CONFIGURE",
                key: {clusterName},
                payload: {clusterName, ...configureOpenPayload},
              }),
            ...sbdToolbar.configureSbd.mark,
          },
          {
            name: "disable-SBD",
            run: () =>
              openTask("sbdDisable", {
                type: "CLUSTER.SBD.DISABLE.INIT",
                key: {clusterName},
                payload: {clusterName},
              }),
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
