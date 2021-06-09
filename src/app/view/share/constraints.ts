export const isValidScore = (score: string) =>
  score.toUpperCase() === "INFINITY" || /^(0|[1-9]\d*)$/.test(score);

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
