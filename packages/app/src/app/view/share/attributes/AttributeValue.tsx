export const AttributeValue = ({
  value,
  defaultValue = null,
}: {
  value?: string | number | null | undefined;
  defaultValue?: string | number | null;
}) => {
  if (value && `${value}`.length > 0) {
    return <dd>{value}</dd>;
  }
  if (defaultValue && `${defaultValue}`.length > 0) {
    return (
      <dd style={{color: "var(--pf-v5-global--Color--200)"}}>
        <div>{defaultValue}</div>
        <div style={{fontStyle: "italic"}}>Default value</div>
      </dd>
    );
  }
  return <dd />;
};
