import React from "react";

export const Body = (
  { children, isExpanded = false, ...rest }:
    React.PropsWithChildren<{ isExpanded: boolean, }>
  ,
) => {
  const classNameList = [];
  if (isExpanded) {
    classNameList.push("pf-m-expanded");
  }
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <tbody
      className={classNameList.length > 0 ? classNameList.join(" ") : ""}
      {...rest}
    >
      {children}
    </tbody>
  );
};
