import {ExpandableSection, Text} from "@patternfly/react-core";

export const PcmkAgentDescription = (props: {
  name: string;
  shortdesc: string | null;
  longdesc: string | null;
  "data-test"?: string;
}) => {
  const lastIndex = props.name.lastIndexOf(":");

  return (
    <div className="pf-v5-c-content" data-test={props["data-test"]}>
      <dl>
        <dt>Type</dt>
        <dd>
          <strong>{props.name.substring(lastIndex + 1)}</strong>
          {` (${props.name.substring(0, lastIndex)})`}
        </dd>
        <dt>Description</dt>
        <dd>
          {props.shortdesc}
          <ExpandableSection toggleText="Full description">
            {(props.longdesc || "").split("\n\n").map((line, i) => (
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
