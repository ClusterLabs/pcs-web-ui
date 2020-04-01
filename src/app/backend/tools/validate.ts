import * as t from "io-ts";
import { isRight } from "fp-ts/lib/Either";
import { PathReporter } from "io-ts/lib/PathReporter";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function validateShape<A, O, I>(response: any, shape: t.Type<A, O, I>) {
  const result = shape.decode(response);
  if (!isRight(result)) {
    return PathReporter.report(result);
  }
  return [];
}

export const validateSameNodes = (
  expected: string[],
  given: string[],
) => {
  const sortedExpected = expected.sort();
  const sortedGiven = given.sort();
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
