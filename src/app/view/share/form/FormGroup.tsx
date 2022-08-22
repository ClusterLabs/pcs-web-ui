import React from "react";
import { FormGroup as PfFormGroup } from "@patternfly/react-core";

import { AttributeHelpPopover } from "app/view/share/attributes";

type FormGroupProps = React.ComponentProps<typeof PfFormGroup>;
export const FormGroup = ({
  fieldId,
  label,
  children,
  helperText,
  isRequired,
  helperTextInvalid,
  isValid = true,
  showValidationErrors = false,
  popover,
  className,
}: {
  fieldId: FormGroupProps["fieldId"];
  label?: FormGroupProps["label"];
  helperText?: FormGroupProps["helperText"];
  isRequired?: FormGroupProps["isRequired"];
  helperTextInvalid?: FormGroupProps["helperTextInvalid"];
  validated?: FormGroupProps["validated"];
  isValid?: boolean;
  showValidationErrors?: boolean;
  popover?: React.ComponentProps<typeof AttributeHelpPopover>;
  className?: FormGroupProps["className"];
  children?: React.ReactNode;
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
  const validated = !isValid && showValidationErrors ? "error" : "default";
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
