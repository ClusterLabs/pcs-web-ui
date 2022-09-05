export const AclDetailCaption = ({
  aclName,
  type,
}: {
  aclName: string;
  type: string;
}) => (
  <>
    <span>{`${type}: `}</span>
    <strong>{`${aclName}`}</strong>
  </>
);
