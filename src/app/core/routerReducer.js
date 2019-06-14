import { connectRouter } from "connected-react-router";

export const getPathName = state => state.location.pathname;

export default connectRouter;
