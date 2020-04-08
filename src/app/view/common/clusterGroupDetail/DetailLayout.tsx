import React from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import {
  Button,
  Level,
  LevelItem,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { TimesIcon } from "@patternfly/react-icons";

import { useGroupDetailViewContext } from "./GroupDetailViewContext";

export const DetailLayout = ({
  caption,
  tabs = null,
  children,
  ...rest
}: React.PropsWithChildren<{
  caption: JSX.Element | JSX.Element[] | string;
  tabs?: JSX.Element | JSX.Element[] | string | null;
}>) => {
  const { urlPrefix } = useGroupDetailViewContext();
  const dispatch = useDispatch();

  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Stack gutter="md" className="pf-u-p-md" {...rest}>
      <StackItem>
        <Level>
          <LevelItem>{caption}</LevelItem>
          <LevelItem>
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
          </LevelItem>
        </Level>
      </StackItem>
      {tabs && <StackItem>{tabs}</StackItem>}
      {children}
    </Stack>
  );
};
