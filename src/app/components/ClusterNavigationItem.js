import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { selectors } from "app/core/routerPlugin";


const ClusterNavigationItemView = ({ to, label, isActive }) => (
  <li className="pf-c-nav__item">
    <Link
      to={to}
      className={`pf-c-nav__link ${isActive(to) ? "pf-m-current" : ""}`}
    >
      {label}
    </Link>
  </li>
);

const withIsActiveCheck = connect(state => ({
  isActive: to => to === selectors.getPathName(state),
}));

export default withIsActiveCheck(ClusterNavigationItemView);
