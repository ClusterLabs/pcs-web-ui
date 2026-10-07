export const isValidScore = (score: string, allow_negative_values = false) =>
  score.toUpperCase() === "INFINITY" || allow_negative_values
    ? /^(0|-?[1-9]\d*)$/.test(score)
    : /^(0|[1-9]\d*)$/.test(score);

export const prepareScore = ({
  score,
  isNegative,
}: {
  score: string;
  isNegative: boolean;
}) => {
  if (isNegative) {
    return score.length > 0 ? `-${score.toUpperCase()}` : "-INFINITY";
  }
  return score.toUpperCase();
};
