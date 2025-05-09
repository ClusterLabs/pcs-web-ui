import type React from "react";

import {AttributeHelpPopover} from "app/view/share";

export const PrimitiveAttrsFormItemLayout = ({
  name,
  shortdesc,
  longdesc,
  defaultValue,
  required,
  children,
}: React.PropsWithChildren<{
  name: string;
  shortdesc: string | null;
  longdesc: string | null;
  defaultValue: string | number | null;
  required: boolean;
}>) => {
  return (
    <div className="pf-v5-c-form__group">
      <span className="pf-v5-c-form__label pf-v5-u-pt-md">
        <span className="pf-v5-c-form__label-text">{name}</span>
        {required && (
          <span className="pf-v5-c-form__label-required" aria-hidden="true">
            &#42;
          </span>
        )}{" "}
        <AttributeHelpPopover
          header={shortdesc}
          body={longdesc}
          defaultValue={defaultValue}
        />
      </span>
      <div
        className="pf-v5-c-form__horizontal-group"
        role="group"
        aria-labelledby={`resource-attribute-value-${name}`}
      >
        {children}
      </div>
    </div>
  );
};
