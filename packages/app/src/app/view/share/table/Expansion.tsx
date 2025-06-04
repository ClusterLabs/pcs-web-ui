import React from "react";

import {ExpansionToggle} from "./ExpansionToggle";
import {ExpandedContent} from "./ExpandedContent";

const useExpansion = ({
  contentSpan,
}: React.PropsWithChildren<{
  contentSpan: number;
}>) => {
  const [expanded, setExpanded] = React.useState("");

  const Toggle = React.useCallback(
    ({
      expandKey,
      children,
      "data-test": dataTest,
      ...rest
    }: {
      expandKey: string;
      children: React.ReactNode;
      "data-test": string;
    }) => {
      return (
        <ExpansionToggle
          expanded={expanded}
          setExpanded={setExpanded}
          expandKey={expandKey}
          data-test={dataTest}
          {...rest}
        >
          {children}
        </ExpansionToggle>
      );
    },
    [expanded],
  );

  const Content = React.useCallback(
    ({
      expandKey,
      isEven,
      children,
    }: {
      isEven: boolean;
      expandKey: string;
      children: React.ReactNode;
    }) =>
      expanded !== expandKey ? null : (
        <ExpandedContent colSpan={contentSpan} isEven={isEven}>
          {children}
        </ExpandedContent>
      ),
    [expanded, contentSpan],
  );

  return {
    expanded,
    Toggle,
    Content,
  };
};

export const Expansion = {
  useExpansion,
  Toggle: ExpansionToggle,
  Content: ExpandedContent,
};
