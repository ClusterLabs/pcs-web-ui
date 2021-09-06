import React from "react";
import {
  Select as PfSelect,
  SelectOption,
  SelectOptionObject,
} from "@patternfly/react-core";

type SelectProps = React.ComponentProps<typeof PfSelect>;
type Props = Omit<SelectProps, "isOpen" | "onToggle" | "onSelect" | "onFilter">;

export const Select = (
  props: Props & {
    onSelect: (_value: string) => void;
    onFilter?: (_value: string) => void;
  } & ({ optionsValues: string[] } | { children: React.ReactNode }),
) => {
  const { onSelect, onFilter, ...restProps } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const select = React.useCallback(
    (
      _event: React.MouseEvent | React.ChangeEvent,
      value: string | SelectOptionObject,
    ) => {
      onSelect(value.toString());
      setIsOpen(false);
    },
    [onSelect],
  );

  const filter = onFilter
    ? (_event: React.ChangeEvent<HTMLInputElement> | null, value: string) => {
        onFilter(value);
        return null as unknown as React.ReactElement[];
      }
    : null;

  if ("optionsValues" in restProps) {
    restProps.children = restProps.optionsValues.map(o => (
      <SelectOption key={o} value={o} />
    ));
    restProps.optionsValues = [];
  }

  let cleanProps;
  if ("optionsValues" in restProps) {
    cleanProps = (
      Object.keys(restProps) as Array<keyof typeof restProps>
    ).reduce(
      (accumulator, key) => ({
        ...accumulator,
        ...(key !== "optionsValues"
          ? { [key]: restProps[key] }
          : {
              children: restProps.optionsValues.map(o => (
                <SelectOption key={o} value={o} />
              )),
            }),
      }),
      {},
    );
  } else {
    cleanProps = restProps;
  }

  const pfProps: SelectProps = {
    ...cleanProps,
    ...(filter !== null ? { onFilter: filter } : {}),
    onToggle: () => setIsOpen(!isOpen),
    isOpen,
    onSelect: select,
  };

  /* eslint-disable react/jsx-props-no-spreading */
  return <PfSelect {...pfProps} />;
};
