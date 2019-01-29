import { connect } from "react-redux";
import { compose, lifecycle } from "recompose";

import { setUpDataReading } from "app/services/data-load/actions";

const withDataSyncStartOnMount = getDataReadingSetup => compose(
  connect(null, { setUpDataReading }),
  lifecycle({
    componentDidMount() {
      this.props.setUpDataReading(getDataReadingSetup(this.props));
    },
  }),
);

export default withDataSyncStartOnMount;
