// tool for enfoce type of literal.
// Consider e.g. with `take` from redux-saga:
// `take("ACTION_KEY");`
// How to check that there is not typo e.g. "ACTION_KEYx"? With this tool:
// `take(typeIs<action["type"]>("ACTION_KEY"))`;
// Typescript doesn't provide tool for it yet, see:
// https://github.com/microsoft/TypeScript/issues/7481
export function typeIs<T>(value:T) {
  return value;
}

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
