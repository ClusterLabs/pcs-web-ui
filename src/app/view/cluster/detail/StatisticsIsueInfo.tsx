import {Label} from "@patternfly/react-core";

import {Link} from "app/view/share";

export const StatisticsIsueInfo = ({
  icon: iconComponent,
  color,
  issueName,
  itemList,
  createLink,
}: {
  icon: React.ReactNode;
  color: React.ComponentProps<typeof Label>["color"];
  issueName: string;
  itemList: string[];
  createLink: (_item: string) => string;
}) => {
  if (itemList.length === 0) {
    return null;
  }

  return (
    <div className="pf-u-my-xs">
      <Label icon={iconComponent} color={color}>
        <strong className="pf-u-mr-xs">{itemList.length}</strong>
        {issueName}
      </Label>{" "}
      {itemList.length < 4 && (
        <span>
          {itemList
            .map<React.ReactNode>(item => (
              <Link isInline key={item} to={createLink(item)} />
            ))
            .reduce((prev, curr) => [prev, ", ", curr])}{" "}
        </span>
      )}
    </div>
  );
};
