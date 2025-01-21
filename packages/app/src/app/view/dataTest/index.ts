import {structure} from "./structure";
export interface SubStructure extends Record<string, SubStructure> {}

// Don't use `export {structure};`. Since structure is in JSON, the mentioned
// export caused the type of `structure` to be `any`.
export const markStructure = structure;

type MarkTools = {
  mark: {"data-test": string};
};

type WithMarkTools<STRUCTURE extends SubStructure> = {
  [KEY in keyof STRUCTURE]: WithMarkTools<STRUCTURE[KEY]> & MarkTools;
};

const createMarkTools = <KEY extends string>(path: KEY[]): MarkTools => ({
  mark: {"data-test": path.join(".")},
});

const addMarkTools = <STRUCTURE extends SubStructure>(
  structure: STRUCTURE,
  path: string[] = [],
): WithMarkTools<STRUCTURE> =>
  Object.entries(structure).reduce<WithMarkTools<STRUCTURE>>(
    (structureWithLocators, [key, subStructure]) => ({
      ...structureWithLocators,
      [key]: addMarkTools(subStructure, [...path, key]),
    }),
    (path.length > 0 ? createMarkTools(path) : {}) as WithMarkTools<STRUCTURE>,
  );

export const testMarks = addMarkTools(structure);
