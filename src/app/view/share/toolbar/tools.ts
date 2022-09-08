export const labelize = (rawName: string) =>
  rawName
    .split(/\s|_|-/g)
    .map(word => word[0].toUpperCase() + word.slice(1))
    .join(" ");
