import React from "react";
import {Level, LevelItem, Stack, StackItem} from "@patternfly/react-core";

import {DetailToolbar} from "./DetailToolbar";

export const DetailLayout = ({
  caption,
  tabs = null,
  children,
  toolbar = null,
  ...rest
}: {
  caption: React.ReactNode | React.ReactNode[] | string;
  tabs?: React.ReactNode | React.ReactNode[] | string | null;
  toolbar?: React.ReactNode | null;
  children: React.ReactNode;
}) => {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Stack hasGutter className="pf-v5-u-p-md" {...rest}>
      <StackItem>
        <Level>
          <LevelItem>{caption}</LevelItem>
          <LevelItem>
            {toolbar}
            {!toolbar && <DetailToolbar />}
          </LevelItem>
        </Level>
      </StackItem>
      {tabs && <StackItem>{tabs}</StackItem>}
      {children}
    </Stack>
  );
};
