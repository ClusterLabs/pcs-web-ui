import type {pcmkAgentTypes} from "app/view/cluster/share";
import {AttributeHelpPopover, AttributeName} from "app/view/share/attributes";

export const PcmkAgentAttrName = ({
  parameter,
  "data-test": dataTest,
}: {
  parameter: pcmkAgentTypes.AgentParameter;
  "data-test"?: string;
}) => {
  return (
    <AttributeName name={parameter.name} data-test={dataTest}>
      <AttributeHelpPopover
        header={parameter.shortdesc}
        body={parameter.longdesc}
        defaultValue={parameter.default}
      />
    </AttributeName>
  );
};
