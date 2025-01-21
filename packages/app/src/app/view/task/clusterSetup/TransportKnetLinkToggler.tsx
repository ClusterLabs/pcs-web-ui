import React from "react";
import {ExpandableSection} from "@patternfly/react-core";

import {testMarks} from "app/view/dataTest";

import type {useTask} from "./useTask";

type Link = Parameters<ReturnType<typeof useTask>["updateLinkKnet"]>[0];
const {toggleAdvancedOptions} =
  testMarks.task.clusterSetup.advancedOptions.transportKnet.knetLink;
export const TransportKnetLinkToggler = ({
  link,
  children,
}: {
  link: Link;
  children: React.ReactNode;
}) => {
  const isLinkFilled = (Object.keys(link) as (keyof Link)[]).some(attr => {
    // unfortunately type script on
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
  const toggleText = isLinkFilled
    ? "Advanced options (some filled, cannot hide)"
    : advancedExpanded
      ? "Hide advanced options"
      : "Show advanced options";
  return (
    <ExpandableSection
      isExpanded={isLinkFilled || advancedExpanded}
      toggleText={toggleText}
      onToggle={() => setAdvancedExpanded(isLinkFilled || !advancedExpanded)}
      toggleContent={<span {...toggleAdvancedOptions.mark}>{toggleText}</span>}
    >
      {children}
    </ExpandableSection>
  );
};
