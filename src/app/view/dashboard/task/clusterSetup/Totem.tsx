import React from "react";
import { Form } from "@patternfly/react-core";

import { clusterSetup } from "app/backend";
import {
  FormRadios,
  FormText,
  TaskLibStep,
  help as helpAll,
} from "app/view/share";

import { useTask } from "./useTask";

const help = helpAll.corosync.totem;

type SetupParams = Parameters<typeof clusterSetup>[0];
type TotemOptions = NonNullable<SetupParams["setupData"]["totem_options"]>;

const TotemFormText: React.FC<{
  optionName: keyof TotemOptions;
  label?: string;
}> = ({ optionName, label = undefined }) => {
  const {
    updateTotemOptions,
    state: { totemOptions },
  } = useTask();
  return (
    <FormText
      label={label !== undefined ? label : help[optionName].header}
      id={`cluster-setup-totem-${optionName}`}
      popover={help[optionName]}
      value={totemOptions[optionName] || ""}
      onChange={value => updateTotemOptions({ [optionName]: value })}
      data-test={`totem.${optionName}`}
    />
  );
};

export const Totem: React.FC = () => {
  const {
    allReports,
    updateTotemOptions,
    state: { totemOptions },
  } = useTask();
  return (
    <TaskLibStep title="Totem" reports={allReports}>
      <Form>
        <FormRadios
          id="cluster-setup-totem-block-unlisted-ips"
          label="Block unlisted ips"
          popover={help.block_unlisted_ips}
          options={["yes", "no", "default"]}
          selected={totemOptions.block_unlisted_ips}
          onChange={value => updateTotemOptions({ block_unlisted_ips: value })}
          data-test="totem.block_unlisted_ips"
        />

        <TotemFormText optionName="consensus" />
        <TotemFormText optionName="downcheck" />
        <TotemFormText optionName="fail_recv_const" />
        <TotemFormText optionName="heartbeat_failures_allowed" />
        <TotemFormText optionName="hold" />
        <TotemFormText optionName="join" />
        <TotemFormText optionName="max_messages" />
        <TotemFormText optionName="max_network_delay" />
        <TotemFormText optionName="merge" />
        <TotemFormText optionName="miss_count_const" />
        <TotemFormText optionName="send_join" />
        <TotemFormText optionName="seqno_unchanged_const" />
        <TotemFormText optionName="token" />
        <TotemFormText optionName="token_coefficient" />
        <TotemFormText optionName="token_retransmit" />
        <TotemFormText optionName="token_retransmits_before_loss_const" />
        <TotemFormText optionName="window_size" />
      </Form>
    </TaskLibStep>
  );
};
