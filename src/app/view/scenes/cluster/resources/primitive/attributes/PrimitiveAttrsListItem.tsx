import React from "react";
import { QuestionCircleIcon } from "@patternfly/react-icons";
import { Popover } from "@patternfly/react-core";
import {
  global_disabled_color_100 as helpColor,
} from "@patternfly/react-tokens";

import { types } from "app/store";

const PrimitiveAttrsListItem = (
  { resourceAgentParameter, instanceAttributes }: {
    resourceAgentParameter: types.resourceAgents.ResourceAgentParameter;
    instanceAttributes: types.cluster.Primitive["instanceAttributes"];
  },
) => (
  <>
    <dt>
      {`${resourceAgentParameter.name} `}
      <Popover
        headerContent={resourceAgentParameter.shortdesc}
        bodyContent={resourceAgentParameter.longdesc}
        footerContent={
          !resourceAgentParameter.default ? null : (
            `Default value: ${resourceAgentParameter.default}`
          )
        }
      >
        <QuestionCircleIcon color={helpColor.var} />
      </Popover>
    </dt>
    {resourceAgentParameter.name in instanceAttributes && (
      <dd>{instanceAttributes[resourceAgentParameter.name].value}</dd>
    )}
    {
      !(resourceAgentParameter.name in instanceAttributes)
      &&
      resourceAgentParameter.default
      && (
        <dd style={{ color: "var(--pf-global--Color--200)" }}>
          <div>{resourceAgentParameter.default}</div>
          <div style={{ fontStyle: "italic" }}>Default value</div>
        </dd>
      )
    }
  </>
);

export default PrimitiveAttrsListItem;
