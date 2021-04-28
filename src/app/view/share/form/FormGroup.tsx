import React from "react";
import { FormGroup as PfFormGroup } from "@patternfly/react-core";

import { AttributeHelpPopover } from "app/view/share/attributes";

type FormGroupProps = React.ComponentProps<typeof PfFormGroup>;
export const FormGroup: React.FC<{
  fieldId: FormGroupProps["fieldId"];
  label: FormGroupProps["label"];
  helperText?: FormGroupProps["helperText"];
  isRequired?: FormGroupProps["isRequired"];
  helperTextInvalid?: FormGroupProps["helperTextInvalid"];
  validated?: FormGroupProps["validated"];
  popover?: React.ComponentProps<typeof AttributeHelpPopover>;
  className?: FormGroupProps["className"];
}> = ({
  fieldId,
  label,
  children,
  helperText,
  isRequired,
  helperTextInvalid,
  validated,
  popover,
  className,
}) => {
  const labelIcon = popover
    ? {
        labelIcon: (
          <AttributeHelpPopover
            header={popover.header}
            body={popover.body}
            defaultValue={popover.defaultValue}
          />
        ),
      }
    : {};
  return (
    <PfFormGroup
      fieldId={fieldId}
      helperText={helperText}
      label={label}
      isRequired={isRequired}
      helperTextInvalid={helperTextInvalid}
      validated={validated}
      className={className}
      {...labelIcon}
    >
      {children}
    </PfFormGroup>
  );
};
