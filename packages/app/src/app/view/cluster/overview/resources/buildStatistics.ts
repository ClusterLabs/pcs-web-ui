import type {Cluster} from "app/view/cluster/types";

type ResourceTree = Cluster["resourceTree"];

type ResourcePath = string | string[];
type Issues = Record<string, ResourcePath[]>;
type Stats = {
  totalCount: number;
  plain: {total: string[]; clone: string[]};
  groups: {total: string[]; clone: string[]};
  issues: {warnings: Issues; errors: Issues};
};

const mergeIssue = (
  issueMap: Issues,
  label: string,
  resourcePath: ResourcePath,
) => ({
  ...issueMap,
  [label]: [...(issueMap[label] || []), resourcePath],
});

const mergeIssueMaps = (
  issues: Stats["issues"],
  resource: ResourceTree[number],
  context?: string[] | undefined,
) => {
  let warnings: Issues = {...issues.warnings};
  let errors: Issues = {...issues.errors};
  const path = context ? [...context, resource.id] : resource.id;
  resource.status.infoList.forEach(({label, severity}) => {
    if (severity === "ERROR") {
      errors = mergeIssue(errors, label, path);
    }
    if (severity === "WARNING") {
      warnings = mergeIssue(warnings, label, path);
    }
  });

  return {errors, warnings};
};

const mergeGroupIssues = (
  currentIssues: Stats["issues"],
  group: Extract<ResourceTree[number], {itemType: "group"}>,
  context?: string[] | undefined,
) => {
  let issues = {...currentIssues};
  const path = context ? [...context, group.id] : [group.id];
  group.resources.forEach(resource => {
    if (resource.itemType === "primitive") {
      issues = mergeIssueMaps(issues, resource, path);
    }
    if (resource.itemType === "fence-device") {
      issues.errors = mergeIssue(
        currentIssues.errors,
        "fence device in group",
        [group.id, resource.id],
      );
    }
  });
  return issues;
};

export const buildStatistics = (resourceTree: ResourceTree) =>
  resourceTree.reduce<Stats>(
    (statistics, resource) => {
      const stats = {...statistics};

      if (resource.itemType === "primitive") {
        stats.totalCount += 1;
        stats.plain.total.push(resource.id);
        stats.issues = mergeIssueMaps(stats.issues, resource);
      }
      if (resource.itemType === "group") {
        stats.totalCount += 1;
        stats.groups.total.push(resource.id);
        stats.issues = mergeGroupIssues(stats.issues, resource);
      }
      if (resource.itemType === "clone") {
        if (resource.member.itemType === "primitive") {
          stats.totalCount += 1;
          stats.plain.clone.push(resource.id);
          stats.plain.total.push(resource.id);
          stats.issues = mergeIssueMaps(stats.issues, resource.member, [
            resource.id,
          ]);
        }
        if (resource.member.itemType === "group") {
          stats.totalCount += 1;
          stats.groups.clone.push(resource.id);
          stats.groups.total.push(resource.id);
          stats.issues = mergeGroupIssues(stats.issues, resource.member, [
            resource.id,
          ]);
        }
        if (resource.member.itemType === "fence-device") {
          stats.issues.errors = mergeIssue(
            stats.issues.errors,
            "fence device in clone",
            [resource.id, resource.member.id],
          );
        }
      }
      return stats;
    },
    {
      totalCount: 0,
      plain: {total: [], clone: []},
      groups: {total: [], clone: []},
      issues: {warnings: {}, errors: {}},
    },
  );
