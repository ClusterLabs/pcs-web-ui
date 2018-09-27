import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Item = ({ active, name, label, link }) => (
  <Menu.Item name={name} active={active === name}>
    <Link to={link}>{label}</Link>
  </Menu.Item>
);

const ClusterDetailMenu = ({ active, clusterName }) => (
  <Menu vertical>
    <Item
      name="overview"
      label="Overview"
      link={`/cluster/${clusterName}`}
      active={active}
    />
    <Item
      active={active}
      name="nodes"
      label="Nodes"
      link={`/cluster/${clusterName}/nodes`}
    />
    <Item
      active={active}
      name="resources"
      label="Resources"
      link={`/cluster/${clusterName}/resources`}
    />
    <Item
      active={active}
      name="stonith"
      label="Stonith"
      link={`/cluster/${clusterName}/stonith`}
    />
    <Item
      active={active}
      name="properties"
      label="Cluster properties"
      link={`/cluster/${clusterName}/properties`}
    />
    <Item
      active={active}
      name="acl"
      label="Access control list"
      link={`/cluster/${clusterName}/acl`}
    />
  </Menu>
  );
export default ClusterDetailMenu;
