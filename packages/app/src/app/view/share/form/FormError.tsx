import type React from "react";
import {
  FormHelperText,
  HelperText,
  HelperTextItem,
} from "@patternfly/react-core";
import {ExclamationCircleIcon} from "@patternfly/react-icons";

export const FormError = (props: {errorText: React.ReactNode}) => {
  return (
    <FormHelperText>
      <HelperText>
        <HelperTextItem icon={<ExclamationCircleIcon />} variant="error">
          {props.errorText}
        </HelperTextItem>
      </HelperText>
    </FormHelperText>
  );
};
