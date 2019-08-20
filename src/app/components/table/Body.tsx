import React from "react";

const Body = (
  { children, isExpanded = false, ...rest }:
    React.PropsWithChildren<{ isExpanded: boolean, }>
  ,
) => {
  const classNameList = [];
  if (isExpanded) {
    classNameList.push("pf-m-expanded");
  }
  return (
    <tbody
      className={classNameList.length > 0 ? classNameList.join(" ") : ""}
      {...rest}
    >
      {children}
    </tbody>
  );
};

export default Body;
