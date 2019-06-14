import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectors } from "app/core/routerPlugin";


const ClusterNavigationItemView = ({ to, label }) => {
  const pathname = useSelector(selectors.getPathName);
  return (
    <li className="pf-c-nav__item">
      <Link
        to={to}
        className={`pf-c-nav__link ${to === pathname ? "pf-m-current" : ""}`}
      >
        {label}
      </Link>
    </li>
  );
};

export default ClusterNavigationItemView;
