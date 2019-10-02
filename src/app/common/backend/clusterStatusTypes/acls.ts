type ApiAclRoleId = string;
type ApiAclGroupId = string;

/*
TODO complete attributes according rng schemes
datasource: /cib/configuration/acls/*
*/
export interface ApiAcl {
  role: {
    [id: string]: {
      description: string;
      permissions: string[];
    };
  };
  group: {
    [id:string]: ApiAclRoleId[];
  };
  user: {
    [id:string]: ApiAclRoleId[];
  };
  target: {
    [id:string]: ApiAclRoleId[];
  };
}
