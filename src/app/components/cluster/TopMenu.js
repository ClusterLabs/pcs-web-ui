import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import { Link } from "react-router-dom";

import TopMenu from "../TopMenu";

const ClusterTopMenu = ({ clusterName, children, clusterSection }) => (
  <TopMenu breadcrumbs={
    <Breadcrumb>
      <Breadcrumb.Section as={() => <Link to="/">Clusters</Link>} />
      <Breadcrumb.Divider as={() => <span> / </span>} />
      <Breadcrumb.Section
        as={() => (
            children || clusterSection
            ? <Link to={`/cluster/${clusterName}`}>{clusterName}</Link>
            : clusterName
          )}
      />
      {
          clusterSection
          &&
          <React.Fragment>
            <Breadcrumb.Divider as={() => <span> / </span>} />
            <Breadcrumb.Section
              active
              as={() => <span>{clusterSection}</span>}
            />
          </React.Fragment>

        }
      {
          children
          &&
          <Breadcrumb.Divider as={() => <span> / </span>} />
        }
      {children}
    </Breadcrumb>
    }
  />
  );
export default ClusterTopMenu;
