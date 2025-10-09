import React from "react";
import {testMarks} from "app/view/dataTest";
import {FormRadios, FormSelectSimple} from "app/view/share";
import {useTask} from "./useTask";

type FormRadiosProps = React.ComponentProps<typeof FormRadios>;

const {property} = testMarks.task.propertiesUpdate.propertiesForm;
const DEFAULT = "DEFAULT";

export const PropertyFormFielChoose = (props: {
  id: string;
  name: string;
  value: string | undefined;
  label: FormRadiosProps["label"];
  options: string[];
  popover: FormRadiosProps["popover"];
}) => {
  const {modifyProperty} = useTask();
  const modify = React.useCallback(
    (val: string) => modifyProperty(props.name, val === DEFAULT ? "" : val),
    [props.name, modifyProperty],
  );
  const value = props.value ?? DEFAULT;
  const options = [DEFAULT, ...props.options];
  const selected = value === "" ? DEFAULT : value;

  if (props.options.length < 4) {
    return (
      <FormRadios
        id={props.id}
        label={props.label}
        options={options}
        selected={selected}
        onChange={modify}
        popover={props.popover}
        {...property.value.mark}
      />
    );
  }
  return (
    <FormSelectSimple
      id={props.id}
      label={props.label}
      offeredOptions={options}
      selected={selected}
      onSelect={modify}
      popover={props.popover}
      {...property.value.mark}
    />
  );
};
