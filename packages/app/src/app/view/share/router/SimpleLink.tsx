import {Button} from "@patternfly/react-core";

export const SimpleLink = ({
  onClick,
  label,
  "data-test": dataTest,
  strong = false,
  isInline = false,
}: {
  onClick: () => void;
  label: React.ReactNode;
  ["data-test"]?: string;
  strong?: boolean;
  isInline?: boolean;
}) => {
  let decoratedLabel = label;
  if (dataTest) {
    decoratedLabel = <span data-test={dataTest}>{decoratedLabel}</span>;
  }
  if (strong) {
    decoratedLabel = <strong>{decoratedLabel}</strong>;
  }
  return (
    <Button variant="link" onClick={onClick} isInline={isInline}>
      {decoratedLabel}
    </Button>
  );
};
