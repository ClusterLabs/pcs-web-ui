/* eslint-disable indent */
export const mapConstants = <Ti extends number|string, To>(
  defaultValue: To,
  constantMap: { [key in Ti]: To },
) => (constant: Ti): To => (
  constantMap[constant] !== undefined ? constantMap[constant] : defaultValue
);

export const compareStrings = (a: string, b: string): number => {
  const upperA = a.toUpperCase();
  const upperB = b.toUpperCase();
  if (upperA < upperB) {
    return -1;
  }
  if (upperA > upperB) {
    return 1;
  }
  return 0;
};
