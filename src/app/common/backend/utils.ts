export const validateSameNodes = (
  expected: string[],
  given: string[],
) => {
  const sortedExpected = expected.sort();
  const sortedGiven = expected.sort();
  if (sortedExpected.length !== sortedGiven.length) {
    return [
      `Expected ${sortedExpected.length} node names but was ${
        sortedGiven.length
      }`,
    ];
  }

  const correctNodeNames = sortedExpected.sort()
    .map((item, i) => sortedGiven[i] === item)
    .every(match => match)
  ;
  if (!correctNodeNames) {
    return [
      `Wrong node names returned: expected [${
        sortedExpected
      }] but was given [${sortedGiven}]`,
    ];
  }
  return [];
};
