import {testMarks} from "app/view/dataTest";
import {FormText} from "app/view/share";

import {PropertyFormFielChoose} from "./PropertyFormFieldChoose";
import {type ClusterProperties, useTask} from "./useTask";

const {
  property: {name: propertyName, value: propertyValue},
} = testMarks.task.propertiesUpdate.propertiesForm;

export const PropertyFormField = ({
  property,
}: {
  property: ClusterProperties[number];
}) => {
  const {userPropertyMap, modifyProperty} = useTask();

  const userProperty = userPropertyMap[property.name];

  const popover = {
    header: property.shortdesc,
    body: property.longdesc,
    defaultValue: property.default,
  };

  const label = <span {...propertyName.mark}>{property.readable_name}</span>;

  const id = `cluster-property-${property.name}`;
  if ("enum" in property) {
    return (
      <PropertyFormFielChoose
        id={id}
        label={label}
        name={property.name}
        options={property.enum}
        value={userProperty}
        popover={popover}
      />
    );
  }

  if (property.type === "boolean") {
    return (
      <PropertyFormFielChoose
        id={id}
        label={label}
        name={property.name}
        options={["true", "false"]}
        value={userProperty}
        popover={popover}
      />
    );
  }

  return (
    <FormText
      id={id}
      label={label}
      popover={popover}
      onChange={value => modifyProperty(property.name, value)}
      value={userProperty ?? ""}
      placeholder={property.default as string}
      {...propertyValue.mark}
    />
  );
};
