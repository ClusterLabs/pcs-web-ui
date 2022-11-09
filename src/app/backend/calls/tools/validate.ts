import * as t from "io-ts";
import {isRight} from "fp-ts/lib/Either";
import {PathReporter} from "io-ts/lib/PathReporter";

export function shape<A, O, I>(
  payload: ReturnType<typeof JSON.parse>,
  payloadShape: t.Type<A, O, I>,
) {
  const validationResult = payloadShape.decode(payload);
  if (!isRight(validationResult)) {
    return PathReporter.report(validationResult);
  }
  return [];
}

export const sameNodes = (expected: string[], given: string[]) => {
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
