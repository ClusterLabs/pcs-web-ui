export const updateResourceParams = ({
  resourceId,
  attributes,
}: {
  resourceId: string;
  attributes: Record<string, string>;
}): [string, string][] => [
  ["resource_id", resourceId],
  ...Object.keys(attributes).map((key): [string, string] => [
    `_res_paramne_${key}`,
    attributes[key],
  ]),
];
