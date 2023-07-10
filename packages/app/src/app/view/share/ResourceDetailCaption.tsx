export const ResourceDetailCaption = (props: {
  resourceId: string;
  type: string;
  "data-test"?: string;
}) => (
  <>
    <strong data-test={props["data-test"]}>{`${props.resourceId} `}</strong>
    <span>{`(${props.type})`}</span>
  </>
);
