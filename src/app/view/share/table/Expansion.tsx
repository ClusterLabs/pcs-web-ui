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
    ({expandKey, children, ...rest}) => (
      /* eslint-disable react/jsx-props-no-spreading */
      <ExpansionToggle
        expanded={expanded}
        setExpanded={setExpanded}
        expandKey={expandKey}
        {...rest}
      >
        {children}
      </ExpansionToggle>
    ),
    [expanded, setExpanded],
  );

  const Content = React.useCallback(
    ({expandKey, children}) =>
      expanded !== expandKey ? null : (
        <ExpandedContent colSpan={contentSpan}>{children}</ExpandedContent>
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
