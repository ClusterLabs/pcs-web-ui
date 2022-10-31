import React from "react";
import {Button} from "@patternfly/react-core";

import {useRunOnEnter} from "./useRunOnEnter";

export const ButtonWithEnter = (
  props: React.ComponentProps<typeof Button> & {
    onClick: () => void;
  },
) => {
  useRunOnEnter(props.onClick);
  return <Button {...props}>{props.children}</Button>;
};
