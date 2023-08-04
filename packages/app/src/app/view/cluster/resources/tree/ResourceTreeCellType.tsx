export const ResourceTreeCellType = (props: {
  type: string;
  typeDescription?: string;
  "data-test"?: string;
}) => {
  return (
    <>
      <span>Type </span>
      <strong data-test={props["data-test"]}>{props.type}</strong>
      {props.typeDescription && <span>{` (${props.typeDescription})`}</span>}
    </>
  );
};
