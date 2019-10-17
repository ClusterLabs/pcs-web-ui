/* eslint-disable camelcase */
/*
TODO obsoletes
*/
export interface ApiAgentParameter{
  name: string;
  shortdesc: string;
  longdesc: string;
  default: string;
  required: boolean,
  advanced: boolean,
  deprecated: boolean,
  deprecated_by: string[],
  obsoletes: null,
  pcs_deprecated_warning: "",
}

export interface ApiAgentMetadata {
  name: string;
  parameters: ApiAgentParameter[];
}
