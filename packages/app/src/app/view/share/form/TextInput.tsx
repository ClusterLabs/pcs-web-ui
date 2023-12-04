import {TextInput as PfTextInput} from "@patternfly/react-core";

type Props = React.ComponentProps<typeof PfTextInput>;

export const TextInput = (props: {
  autoComplete?: Props["autoComplete"];
  autoFocus?: Props["autoFocus"];
  defaultValue?: Props["defaultValue"];
  id?: string;
  isDisabled?: Props["isDisabled"];
  isRequired?: Props["isRequired"];
  name?: string;
  onChange?: (value: string) => void;
  placeholder?: Props["placeholder"];
  type?: Props["type"];
  validated?: Props["validated"];
  value?: Props["value"];
  "data-test"?: string;
}) => {
  return (
    <PfTextInput
      autoComplete={props.autoComplete}
      autoFocus={props.autoFocus}
      defaultValue={props.defaultValue}
      id={props.id}
      isDisabled={props.isDisabled}
      isRequired={props.isRequired}
      name={props.name}
      onChange={props.onChange}
      placeholder={props.placeholder}
      type={props.type}
      validated={props.validated}
      value={props.value}
      data-test={props["data-test"]}
    />
  );
};
