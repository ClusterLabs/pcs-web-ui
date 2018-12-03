import { lifecycle } from "recompose";

/* eslint-disable import/prefer-default-export */

export const loadDataOnMount = getDataReadingSetup => lifecycle({
  componentDidMount() {
    const { dataLoadActions } = this.props;
    dataLoadActions.setUpDataReading(getDataReadingSetup(this.props));
  },
});
