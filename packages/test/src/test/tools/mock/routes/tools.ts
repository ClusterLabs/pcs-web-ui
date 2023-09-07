// list-values-in-query:
// * when "node_names[]=node1" appears in the query then it is recognized as
//   {"node_names[]": "node1"} - i.e. value is string not array
//
// * but when "node_names[]=node1&node_names[]=node2" appears in the query then
//   it is recognized as
//  {"node_names[]": ["node1", "node2"]} - i.e. value is array unlike prev case
//
//
const sanitizeValue = <KEY extends string>(
  body: Record<KEY, string | string[]>,
  key: KEY,
  value: string,
) => {
  if (!key.endsWith("[]") || key in body === false) {
    return value;
  }
  if (Array.isArray(body[key])) {
    return [...body[key], value];
  }
  return [body[key], value];
};

export const paramsToBody = (params: [string, string][]) =>
  params.reduce(
    (body, [key, value]) => ({
      ...body,
      [key]: sanitizeValue(body, key, value),
    }),
    {},
  );
