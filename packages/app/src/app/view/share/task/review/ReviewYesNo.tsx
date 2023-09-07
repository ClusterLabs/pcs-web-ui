import React from "react";

import {ReviewValue} from "./ReviewValue";

export const ReviewYesNo = ({
  label,
  value,
}: {
  label: React.ReactNode;
  value: boolean;
}) => {
  return <ReviewValue label={label} value={value ? "yes" : "no"} />;
};
