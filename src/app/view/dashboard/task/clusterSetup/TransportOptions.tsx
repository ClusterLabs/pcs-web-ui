import React from "react";
import { Form } from "@patternfly/react-core";

import {
  FormSelect,
  FormText,
  TaskLibStep,
  help as helpAll,
} from "app/view/share";

import { useTask } from "./useTask";

const help = helpAll.knet.options;

const ID_PREFIX = "cluster-setup-transport-options";
export const TransportOptions: React.FC = () => {
  const {
    allReports,
    updateTransportOptions,
    state: { transportOptions },
  } = useTask();
  return (
    <TaskLibStep title="Knet transport" reports={allReports}>
      <Form>
        <FormSelect
          label="Ip version"
          id={`${ID_PREFIX}-ip_version`}
          popover={help.ip_version}
          optionsValues={["ipv4", "ipv6", "ipv4-6", "ipv6-4", "default"]}
          selections={transportOptions.ip_version}
          onSelect={value =>
            updateTransportOptions({
              ip_version: value.toString() as NonNullable<
                typeof transportOptions.ip_version
              >,
            })
          }
        />

        <FormText
          label="PMTUd Interval"
          id={`${ID_PREFIX}-pmtud-interval`}
          popover={help.knet_pmtud_interval}
          value={transportOptions.knet_pmtud_interval}
          onChange={value =>
            updateTransportOptions({ knet_pmtud_interval: value })
          }
        />

        <FormSelect
          label="Link mode"
          id={`${ID_PREFIX}-link_mode`}
          popover={help.link_mode}
          optionsValues={["active", "passive", "rr", "default"]}
          selections={transportOptions.link_mode}
          onSelect={value =>
            updateTransportOptions({
              link_mode: value.toString() as NonNullable<
                typeof transportOptions.link_mode
              >,
            })
          }
        />
      </Form>
    </TaskLibStep>
  );
};
