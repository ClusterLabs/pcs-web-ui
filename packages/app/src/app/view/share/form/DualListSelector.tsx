import type React from "react";
import {DualListSelector as PfDualListSelector} from "@patternfly/react-core";

type Props = React.ComponentProps<typeof PfDualListSelector>;

export const DualListSelector = (props: {
  isSearchable?: boolean;
  availableOptions?: Props["availableOptions"];
  availableOptionsTitle?: string;
  chosenOptions?: Props["chosenOptions"];
  chosenOptionsTitle?: string;
  onListChange?: (
    newAvailableOptions: React.ReactNode[],
    newChosenOptions: React.ReactNode[],
  ) => void;
  id?: string;
}) => {
  const {onListChange} = props;
  return (
    <PfDualListSelector
      isSearchable={props.isSearchable}
      availableOptions={props.availableOptions}
      availableOptionsTitle={props.availableOptionsTitle}
      chosenOptions={props.chosenOptions}
      chosenOptionsTitle={props.chosenOptionsTitle}
      onListChange={
        onListChange
          ? (_event, newAvailableOptions, newChosenOptions) =>
              onListChange(newAvailableOptions, newChosenOptions)
          : onListChange
      }
      id={props.id}
    />
  );
};
