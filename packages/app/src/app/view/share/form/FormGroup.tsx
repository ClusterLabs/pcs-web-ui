import React from "react";
import {
  FormHelperText,
  HelperText,
  HelperTextItem,
  FormGroup as PfFormGroup,
} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

import {AttributeHelpPopover} from "app/view/share/attributes";

type FormGroupProps = React.ComponentProps<typeof PfFormGroup>;
export const FormGroup = ({
  fieldId,
  label,
  children,
  isRequired,
  helperTextInvalid,
  isInline,
  isValid = true,
  showValidationErrors = false,
  popover,
  className,
}: {
  fieldId: FormGroupProps["fieldId"];
  label?: FormGroupProps["label"];
  isRequired?: FormGroupProps["isRequired"];
  helperTextInvalid?: React.ReactNode;
  validated?: "default" | "error";
  isInline?: FormGroupProps["isInline"];
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
      label={label}
      isRequired={isRequired}
      className={className}
      isInline={isInline}
      {...labelIcon}
    >
      {children}
      {validated === "error" && (
        <FormHelperText>
          <HelperText>
            <HelperTextItem
              icon={<ExclamationCircleIcon />}
              variant={validated}
            >
              {helperTextInvalid}
            </HelperTextItem>
          </HelperText>
        </FormHelperText>
      )}
    </PfFormGroup>
  );
};
