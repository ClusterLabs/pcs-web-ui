export const mapConstants = (
  defaultValue: number|string,
  constantMap: { [key: string]: number|string },
) => (constant: string) => (
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
