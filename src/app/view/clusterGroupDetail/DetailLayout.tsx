import React from "react";
import { Level, LevelItem, Stack, StackItem } from "@patternfly/react-core";

import { DetailLayoutToolbar } from "./DetailLayoutToolbar";

export const DetailLayout: React.FC<{
  caption: JSX.Element | JSX.Element[] | string;
  tabs?: JSX.Element | JSX.Element[] | string | null;
  toolbar?: JSX.Element | null;
}> = ({ caption, tabs = null, children, toolbar = null, ...rest }) => {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Stack hasGutter className="pf-u-p-md" {...rest}>
      <StackItem>
        <Level>
          <LevelItem>{caption}</LevelItem>
          <LevelItem>
            {toolbar}
            {!toolbar && <DetailLayoutToolbar />}
          </LevelItem>
        </Level>
      </StackItem>
      {tabs && <StackItem>{tabs}</StackItem>}
      {children}
    </Stack>
  );
};
