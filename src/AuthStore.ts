import { LoggedInUserKey } from "./constant";
import { LoggedInUserDetails } from "./models/types/auth";

export const GetLoggedInUserDetails = (): LoggedInUserDetails => {
  const value: LoggedInUserDetails = JSON.parse(
    localStorage.getItem(LoggedInUserKey) || "{}"
  );
  return value;
};

export const SetLoggedInUserDetails = (userDetails: LoggedInUserDetails) => {
  localStorage.setItem(LoggedInUserKey, JSON.stringify(userDetails));
};

export const ClearStorage = () => localStorage.clear();
