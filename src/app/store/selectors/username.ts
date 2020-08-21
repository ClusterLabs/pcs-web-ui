import { types } from "app/store/state";
import { Selector } from "./selector";

export const getUsername: Selector<types.username.UsernameState> = state =>
  state.username;

export const usernameLoaded: Selector<boolean> = state => state.username !== "";
