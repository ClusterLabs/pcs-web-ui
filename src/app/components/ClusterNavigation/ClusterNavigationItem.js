import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


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
  isActive: to => to === state.router.location.pathname,
}));

export default withIsActiveCheck(ClusterNavigationItemView);
