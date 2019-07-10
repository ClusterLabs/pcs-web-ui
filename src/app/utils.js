export const mapConstants = (defaultValue, constantMap) => constant => (
  constantMap[constant] !== undefined ? constantMap[constant] : defaultValue
);

export const compareStrings = (a, b) => {
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
