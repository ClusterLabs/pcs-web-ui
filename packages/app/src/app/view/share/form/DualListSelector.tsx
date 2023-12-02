import React from "react";
import {DualListSelector as PfDualListSelector} from "@patternfly/react-core";

type Props = React.ComponentProps<typeof PfDualListSelector>;

export const DualListSelector = (props: {
  isSearchable?: boolean;
  availableOptions?: Props["availableOptions"];
  availableOptionsTitle?: string;
  chosenOptions?: Props["chosenOptions"];
  chosenOptionsTitle?: string;
  onListChange?: (
    _newAvailableOptions: React.ReactNode[],
    newChosenOptions: React.ReactNode[],
  ) => void;
  id?: string;
}) => {
  return (
    <PfDualListSelector
      isSearchable={props.isSearchable}
      availableOptions={props.availableOptions}
      availableOptionsTitle={props.availableOptionsTitle}
      chosenOptions={props.chosenOptions}
      chosenOptionsTitle={props.chosenOptionsTitle}
      onListChange={props.onListChange}
      id={props.id}
    />
  );
};
