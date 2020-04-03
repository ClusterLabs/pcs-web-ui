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

export const validateSameNodes = (expected: string[], given: string[]) => {
  const sExpected = expected.sort();
  const sGiven = given.sort();
  if (sExpected.length !== sGiven.length) {
    return [`Expected ${sExpected.length} node names but was ${sGiven.length}`];
  }

  const correctNodeNames = sExpected
    .sort()
    .map((item, i) => sGiven[i] === item)
    .every(match => match);
  if (!correctNodeNames) {
    return [
      `Wrong node names returned: expected [${sExpected}] but was given [${sGiven}]`,
    ];
  }
  return [];
};
