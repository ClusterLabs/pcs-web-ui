import {Cluster} from "app/view/cluster/types";

type ResourceTree = Cluster["resourceTree"];

type Issues = Record<string, string[]>;
type Stats = {
  plain: {total: string[]; clone: string[]};
  groups: {total: string[]; clone: string[]};
  issues: {warnings: Issues; errors: Issues};
};

const mergeIssues = (
  issues: Stats["issues"],
  resource: ResourceTree[number],
) => {
  let warnings: Issues = {...issues.warnings};
  let errors: Issues = {...issues.errors};
  resource.status.infoList.forEach(({label, severity}) => {
    if (severity === "ERROR") {
      errors = {
        ...errors,
        [label]: [...(errors[label] || []), resource.id],
      };
    }
    if (severity === "WARNING") {
      warnings = {
        ...warnings,
        [label]: [...(warnings[label] || []), resource.id],
      };
    }
  });

  return {errors, warnings};
};

const mergeGroupIssues = (
  currentIssues: Stats["issues"],
  group: Extract<ResourceTree[number], {itemType: "group"}>,
) => {
  let issues = {...currentIssues};
  group.resources.forEach(resource => {
    if (resource.itemType === "primitive") {
      issues = mergeIssues(issues, resource);
    }
  });
  return issues;
};

export const buildStatistics = (resourceTree: ResourceTree) =>
  resourceTree.reduce<Stats>(
    (statistics, resource) => {
      const stats = {...statistics};

      if (resource.itemType === "primitive") {
        stats.plain.total.push(resource.id);
        stats.issues = mergeIssues(stats.issues, resource);
      }
      if (resource.itemType === "group") {
        stats.groups.total.push(resource.id);
        stats.issues = mergeGroupIssues(stats.issues, resource);
      }
      if (resource.itemType === "clone") {
        if (resource.member.itemType === "primitive") {
          stats.plain.clone.push(resource.id);
          stats.plain.total.push(resource.id);
          stats.issues = mergeIssues(stats.issues, resource.member);
        }
        if (resource.member.itemType === "group") {
          stats.groups.clone.push(resource.id);
          stats.groups.total.push(resource.id);
          stats.issues = mergeGroupIssues(stats.issues, resource.member);
        }
      }
      return stats;
    },
    {
      plain: {total: [], clone: []},
      groups: {total: [], clone: []},
      issues: {warnings: {}, errors: {}},
    },
  );
