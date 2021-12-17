import React from "react";
import { ExpandableSection, Text } from "@patternfly/react-core";

export const PcmkAgentDescription = ({
  name,
  shortdesc,
  longdesc,
}: {
  name: string;
  shortdesc: string | null;
  longdesc: string | null;
}) => {
  const lastIndex = name.lastIndexOf(":");

  return (
    <div className="pf-c-content" data-test="agent-description">
      <dl>
        <dt>Type</dt>
        <dd>
          <strong>{name.substring(lastIndex + 1)}</strong>
          {` (${name.substring(0, lastIndex)})`}
        </dd>
        <dt>Description</dt>
        <dd>
          {shortdesc}
          <ExpandableSection toggleText="Full description">
            {(longdesc || "").split("\n\n").map((line, i) => (
              /* eslint-disable react/no-array-index-key */
              <Text component="p" key={i}>
                {line}
              </Text>
            ))}
          </ExpandableSection>
        </dd>
      </dl>
    </div>
  );
};
