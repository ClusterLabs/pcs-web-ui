import {DescriptionListDescription, Label} from "@patternfly/react-core";
import {LockIcon} from "@patternfly/react-icons";

export const isCibSecret = (value: string | undefined): boolean =>
  value === "lrm://";

export const AttributeValueSecret = ({
  "data-test": dataTest,
}: {
  "data-test"?: string;
}) => {
  return (
    <DescriptionListDescription>
      <Label color="gold" icon={<LockIcon />} isCompact data-test={dataTest}>
        CIB secret
      </Label>
    </DescriptionListDescription>
  );
};
