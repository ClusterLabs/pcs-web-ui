import React from "react";
import { QuestionCircleIcon } from "@patternfly/react-icons";
import { Popover } from "@patternfly/react-core";
// prettier-ignore
import {
  global_disabled_color_100 as helpColor,
} from "@patternfly/react-tokens";

export const AttributeHelpPopover = ({
  header,
  body,
  defaultValue = null,
}: {
  header: string;
  body: string;
  defaultValue?: string | number | null;
}) => {
  return (
    <Popover
      headerContent={header}
      bodyContent={body}
      footerContent={
        defaultValue !== null && `${defaultValue}`.length > 0
          ? `Default value: ${defaultValue}`
          : null
      }
    >
      <QuestionCircleIcon color={helpColor.var} />
    </Popover>
  );
};
