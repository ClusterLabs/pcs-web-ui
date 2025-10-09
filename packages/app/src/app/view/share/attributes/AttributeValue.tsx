import {DescriptionListDescription} from "@patternfly/react-core";

export const AttributeValue = ({
  value,
  defaultValue = null,
  "data-test": dataTest,
}: {
  value?: string | number | null | undefined;
  defaultValue?: string | number | null;
  "data-test"?: string;
}) => {
  if (value && `${value}`.length > 0) {
    return (
      <DescriptionListDescription data-test={dataTest}>
        {value}
      </DescriptionListDescription>
    );
  }
  if (defaultValue && `${defaultValue}`.length > 0) {
    return (
      <DescriptionListDescription
        data-test={dataTest}
        style={{color: "var(--pf-v5-global--Color--200)"}}
      >
        <div>{defaultValue}</div>
        <div style={{fontStyle: "italic"}}>Default value</div>
      </DescriptionListDescription>
    );
  }
  return <dd />;
};
