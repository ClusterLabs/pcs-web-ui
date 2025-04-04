import type React from "react";
import {QuestionCircleIcon} from "@patternfly/react-icons";
import {Popover} from "@patternfly/react-core";
import {global_disabled_color_100 as helpColor} from "@patternfly/react-tokens";

type PopoverProps = React.ComponentProps<typeof Popover>;

export const AttributeHelpPopover = ({
  header,
  body,
  defaultValue = null,
}: {
  header: PopoverProps["headerContent"];
  body: PopoverProps["bodyContent"];
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
