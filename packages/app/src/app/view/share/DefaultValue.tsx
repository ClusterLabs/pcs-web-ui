import type React from "react";

export const DefaultValue = (props: {
  value: React.ReactNode;
  "data-test"?: string;
}) => {
  return (
    <div style={{fontStyle: "italic"}} data-test={props["data-test"]}>
      {props.value}
    </div>
  );
};
