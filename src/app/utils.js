/* eslint-disable import/prefer-default-export */
export const mapConstants = (defaultValue, constantMap) => constant => (
  constantMap[constant] !== undefined ? constantMap[constant] : defaultValue
);
