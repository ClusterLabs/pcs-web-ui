import React from "react";

import { ReviewValue } from "./ReviewValue";

export const ReviewYesNo: React.FC<{
  label: React.ReactNode;
  value: boolean;
}> = ({ label, value }) => {
  return <ReviewValue label={label} value={value ? "yes" : "no"} />;
};
