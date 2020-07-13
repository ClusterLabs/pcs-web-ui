import { Selector, username } from "app/store/types";

export const getUsername: Selector<username.UsernameState> = state =>
  state.username;

export const usernameLoaded: Selector<boolean> = state => state.username !== "";
