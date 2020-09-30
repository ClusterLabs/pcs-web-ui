import React from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";
import { push } from "connected-react-router";

import { useGroupDetailViewContext } from "./GroupDetailViewContext";

export const DetailLayoutToolbar: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { urlPrefix } = useGroupDetailViewContext();
  return (
    <Toolbar id="group-detail-layout-detail-toolbar">
      <ToolbarContent>
        {children}
        <ToolbarItem>
          <Button
            variant="plain"
            aria-label="Close panel"
            onClick={(e: React.SyntheticEvent) => {
              e.preventDefault();
              dispatch(push(`${urlPrefix}/`));
            }}
          >
            <TimesIcon />
          </Button>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};
