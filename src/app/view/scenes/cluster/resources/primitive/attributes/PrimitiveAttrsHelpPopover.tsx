import React from "react";
import { QuestionCircleIcon } from "@patternfly/react-icons";
import { Popover } from "@patternfly/react-core";
// prettier-ignore
import {
  global_disabled_color_100 as helpColor,
} from "@patternfly/react-tokens";

import { types } from "app/store";

export const PrimitiveAttrsHelpPopover = ({
  resourceAgentParam,
}: {
  resourceAgentParam: types.resourceAgents.ResourceAgentParameter;
}) => {
  return (
    <Popover
      headerContent={resourceAgentParam.shortdesc}
      bodyContent={resourceAgentParam.longdesc}
      footerContent={
        !resourceAgentParam.default
          ? null
          : `Default value: ${resourceAgentParam.default}`
      }
    >
      <QuestionCircleIcon color={helpColor.var} />
    </Popover>
  );
};
