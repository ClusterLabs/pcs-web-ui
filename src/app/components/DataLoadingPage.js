import React from "react";
import { Container, Loader } from "semantic-ui-react";

import LoadPageProblem from "app/components/LoadPageProblem";

const DataLoadingPage = ({
  loadingStatus,
  children,
  loadingMsg,
  errorHeader,
  errorMsg,
  retry,
}) => (
  <Container>
    {loadingStatus === "none" && children}
    {loadingStatus === "process" && <Loader active>{loadingMsg}</Loader>}
    {
    loadingStatus === "error"
    &&
    <LoadPageProblem retry={retry} header={errorHeader} error={errorMsg} />
  }
  </Container>
);
export default DataLoadingPage;
