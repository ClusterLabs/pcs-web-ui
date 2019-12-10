import React from "react";
import { Link } from "react-router-dom";

import {
  BreadcrumbItem as PfBreadcrumbItem,
} from "@patternfly/react-core";

const BreadcrumbItem = ({ to, label, isActive }: {
  to: string,
  label: string,
  isActive: boolean,
}) => (
  <PfBreadcrumbItem to="" component="span" isActive={isActive}>
    {isActive ? label : <Link to={to}>{label}</Link>}
  </PfBreadcrumbItem>
);

export default BreadcrumbItem;
