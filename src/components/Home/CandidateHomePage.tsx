import React, { useEffect, useState } from "react";
import { RecruiterProfile } from "../../models/RecruiterProfile";
import {
  CandidateDetails,
  IsCandidateDetails,
  LoggedInUserDetails,
} from "../../models/types/auth";
import { GetCandiateProfilesById } from "../../services/CandidateService/Profile";
import { CandidateJobs } from "../pages/Candidate/CandidateJobs";
import { CreateProfile } from "../pages/Candidate/CreateProfile";

interface CandidateLogInProps {
  LoginDetails: LoggedInUserDetails;
}

export const CandidateHomePage = ({ LoginDetails }: CandidateLogInProps) => {
  // Get Profiles
  const [foundProfiles, setFoundProfiles] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchCandidateProfile();
  }, []);

  const fetchCandidateProfile = () => {
    const onSuccess = (response: any) => {
      if (response && response.length > 0) {
        setFoundProfiles(true);
      }
      setIsLoaded(true);
    };
    const onError = (error: any) => {
      setIsLoaded(true);
    };
    const candidateId: number =
      (LoginDetails.userDetails &&
        IsCandidateDetails(LoginDetails.userDetails) &&
        LoginDetails.userDetails.id) ||
      0;
    GetCandiateProfilesById(candidateId, onSuccess, onError);
  };

  return (
    <>
      {isLoaded ? (
        foundProfiles ? (
          <CandidateJobs />
        ) : (
          <CreateProfile LoginDetails={LoginDetails} />
        )
      ) : (
        <div>Fetchin candidate profiles...</div>
      )}
    </>
  );
};
