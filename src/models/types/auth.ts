import { RecruiterProfile } from "../RecruiterProfile";

export interface Login {}

export interface CandidateDetails {
  id: number;
  userId: string;
  isActivelyLooking: boolean;
  firstName: string;
  latName: string;
  mobileNumber: number;
  cityId: number;
  countryCode: number;
}

export interface RecruiterDetails {
  userId: number;
  firstName: string;
  lastName: string;
  companyName: string;
  countryCode: string;
  phoneNumber: string;
  address: string;
  profileId: number;
  isActive: boolean;
}

export interface LoggedInUserDetails {
  userDetails?: CandidateDetails | RecruiterDetails;
  IsGoogleAuthenticated: boolean;
}

export const IsCandidateDetails = (
  userDetails: CandidateDetails | RecruiterDetails
): userDetails is CandidateDetails => {
  return "isActivelyLooking" in userDetails;
};
