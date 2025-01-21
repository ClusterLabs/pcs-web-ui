import React from "react";

import {testMarks} from "app/view/dataTest";
import {FormRadios, FormSelectSimple, FormText} from "app/view/share";

import type {ClusterProperties} from "./useClusterProperties";

const {property: propertyMark} = testMarks.cluster.properties;

export const PropertyFormField = ({
  property,
  userProperty,
  modifyProperty,
  currentValue = undefined,
}: {
  property: ClusterProperties[number];
  userProperty: string | undefined;
  modifyProperty: (_name: string, _value: string) => void;
  currentValue?: string | undefined;
}) => {
  const popover = {
    header: property.shortdesc,
    body: property.longdesc,
    defaultValue: property.default,
  };

  const modifyPropertyWithDefault = React.useCallback(
    (value: string) =>
      modifyProperty(property.name, value === "DEFAULT" ? "" : value),
    [modifyProperty, property],
  );

  const label = (
    <span {...propertyMark.name.mark}>{property.readable_name}</span>
  );

  const id = `cluster-property-${property.name}`;
  if ("enum" in property) {
    const value =
      userProperty !== undefined
        ? userProperty || "DEFAULT"
        : currentValue || "DEFAULT";
    if (property.enum.length < 4) {
      return (
        <FormRadios
          id={id}
          label={label}
          options={["DEFAULT", ...property.enum]}
          selected={value}
          onChange={modifyPropertyWithDefault}
          popover={popover}
          {...propertyMark.value.mark}
        />
      );
    }
    return (
      <FormSelectSimple
        id={id}
        label={label}
        onSelect={modifyPropertyWithDefault}
        selected={value}
        offeredOptions={["DEFAULT", ...property.enum]}
        popover={popover}
        {...propertyMark.value.mark}
      />
    );
  }

  if (property.type === "boolean") {
    let value: string;
    if (userProperty !== undefined) {
      value = userProperty === "" ? "DEFAULT" : userProperty;
    } else {
      value =
        currentValue === "true" || currentValue === "false"
          ? currentValue
          : "DEFAULT";
    }
    return (
      <FormRadios
        id={id}
        label={label}
        options={["DEFAULT", "true", "false"]}
        selected={value}
        onChange={modifyPropertyWithDefault}
        popover={popover}
        {...propertyMark.value.mark}
      />
    );
  }

  return (
    <FormText
      id={id}
      label={label}
      popover={popover}
      onChange={value => modifyProperty(property.name, value)}
      value={userProperty ?? (currentValue || "")}
      placeholder={property.default as string}
      {...propertyMark.value.mark}
    />
  );
};
