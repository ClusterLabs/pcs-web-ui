import React from "react";
import { ExpandableSection } from "@patternfly/react-core";

import { useTask } from "./useTask";

type Link = Parameters<ReturnType<typeof useTask>["updateLinkKnet"]>[0];
export const TransportKnetLinkToggler: React.FC<{ link: Link }> = ({
  link,
  children,
}) => {
  const isLinkFilled = (Object.keys(link) as (keyof Link)[]).some((attr) => {
    // unfortunatelly type script on
    //   link[attr] !== undefined && link[attr].length !== 0,
    //   complains: Object is possibly 'undefined'
    // so take longer expression :( ...
    if (attr === "linknumber" || attr === "addresses") {
      return false;
    }
    const attrValue = link[attr];
    if (attrValue !== undefined) {
      return attrValue.length !== 0;
    }
    return false;
  });
  const [advancedExpanded, setAdvancedExpanded] = React.useState(isLinkFilled);
  return (
    <ExpandableSection
      isExpanded={isLinkFilled || advancedExpanded}
      toggleText={
        isLinkFilled
          ? "Advanced options (some filled, cannot hide)"
          : advancedExpanded
          ? "Hide advanced options"
          : "Show advanced options"
      }
      onToggle={() => setAdvancedExpanded(isLinkFilled || !advancedExpanded)}
      data-test="link-advanced-options"
    >
      {children}
    </ExpandableSection>
  );
};
