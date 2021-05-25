import React from "react";
import { FormGroup } from "@patternfly/react-core";

import { FormSelectOrText } from "app/view/share";

type FormSelectOrTextProps = React.ComponentProps<typeof FormSelectOrText>;
export const FormResourceExistingOrNew: React.FC<{
  label: string;
  checked: FormSelectOrTextProps["checked"];
  onChange: FormSelectOrTextProps["onChange"];
  resourceId: string;
  resourceIdList: string[];
  updateResource: (resourceId: string) => void;
}> = ({
  label,
  checked,
  onChange,
  resourceId,
  resourceIdList,
  updateResource,
}) => {
  return (
    <FormGroup
      label={label}
      isRequired
      fieldId={`constraint-colocation-create-${label.toLowerCase()}`}
    >
      <FormSelectOrText
        id={`constraint-colocation-create-${label.toLowerCase()}`}
        checked={checked}
        onChange={onChange}
        select={{
          label: "Select an existing resource",
          selections: resourceId,
          optionsValues: resourceIdList,
          onSelect: updateResource,
        }}
        text={{
          label: "Type a name of future resource",
          value: resourceId,
          onChange: updateResource,
          helperTextInvalid: "Please provide resource",
          "data-test": `resource-new-${label.toLowerCase()}`,
        }}
      />
    </FormGroup>
  );
};
