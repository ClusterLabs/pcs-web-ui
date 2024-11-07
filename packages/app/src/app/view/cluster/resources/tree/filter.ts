import {Resource} from "app/view/cluster/types";

type Group = Extract<Resource, {itemType: "group"}>;
type Clone = Extract<Resource, {itemType: "clone"}>;
type Primitive = Extract<Resource, {itemType: "primitive"}>;

export type EmptyableClone = Omit<Clone, "member"> & {
  member: Clone["member"] | null;
};

export type FilteredTree = (Exclude<Resource, Clone> | EmptyableClone)[];

const createResourceFilter = (filter: string) => {
  const match = (searchable: string) =>
    searchable.toLowerCase().includes(filter.toLowerCase());

  const filterPrimitive = (primitive: Primitive) =>
    match(primitive.id) || match(primitive.agentName) ? primitive : null;

  const filterGroup = (group: Group): Group | null => {
    const primitives = group.resources.filter(
      primitive => match(primitive.id) || match(primitive.agentName),
    );
    return match(group.id) || primitives.length > 0
      ? {...group, resources: primitives}
      : null;
  };

  const filterClone = (clone: Clone): EmptyableClone | null => {
    if (clone.member.itemType === "group") {
      const group = filterGroup(clone.member);
      return match(clone.id) || group !== null
        ? {...clone, member: group}
        : null;
    }

    if (match(clone.member.id)) {
      return clone;
    }

    if (match(clone.id)) {
      return {...clone, member: null};
    }

    return null;
  };

  return (resource: Resource) => {
    switch (resource.itemType) {
      case "primitive":
        return filterPrimitive(resource);
      case "group":
        return filterGroup(resource);
      default:
        return filterClone(resource);
    }
  };
};

export const filterTree = (tree: Resource[], filter: string): FilteredTree =>
  tree
    .map(createResourceFilter(filter))
    .filter((r): r is NonNullable<typeof r> => r !== null);
