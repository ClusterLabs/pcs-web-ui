import React from "react";
import { Level, LevelItem, Stack, StackItem } from "@patternfly/react-core";

import { DetailLayoutToolbar } from "./DetailLayoutToolbar";

export const DetailLayout: React.FC<{
  caption: React.ReactNode | React.ReactNode[] | string;
  tabs?: React.ReactNode | React.ReactNode[] | string | null;
  toolbar?: React.ReactNode | null;
}> = ({ caption, tabs = null, children, toolbar = null, ...rest }) => {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Stack hasGutter className="pf-u-p-md" {...rest}>
      <StackItem>
        <Level>
          <LevelItem>{caption}</LevelItem>
          <LevelItem>
            {toolbar}
            {!toolbar && <DetailLayoutToolbar toolbarName="default" />}
          </LevelItem>
        </Level>
      </StackItem>
      {tabs && <StackItem>{tabs}</StackItem>}
      {children}
    </Stack>
  );
};
