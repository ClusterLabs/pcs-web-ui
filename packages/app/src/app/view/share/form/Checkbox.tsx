import {Checkbox as PfCheckbox} from "@patternfly/react-core";

export const Checkbox = (props: {
  onChange?: (checked: boolean) => void;
  isChecked?: boolean | null;
  isDisabled?: boolean;
  label?: React.ReactNode;
  id: string;
  "aria-label"?: string;
}) => {
  const {onChange} = props;
  return (
    <PfCheckbox
      onChange={onChange ? checked => onChange(checked) : onChange}
      isChecked={props.isChecked}
      label={props.label}
      id={props.id}
      aria-label={props["aria-label"]}
    />
  );
};
