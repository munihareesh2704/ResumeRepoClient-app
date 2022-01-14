export const APIFragments = {
  SendCandidateOtp: "api/Candidate/SendOTP",
  LoginCandidate: "api/Candidate/Login",
  CreateCandidate: "api/Candidate/CreateCandidate",
  GetCandidate: "api/Candidate/GetDetails/{userId}",
  //#region  Candidate
  CreateProfile: "api/CandidateProfile/Add",
  GetCandidateProfilesById: "api/CandidateProfile/{userName}",

  //#endregion

  //#region Recruiter
  RecruiterSignUp: "api/recruiter/SingUp",
  RecruiterSingIn: "api/recruiter/SignIn",
  RecruiterSendOtp: "api/recruiter/SendOtp/{otp}",
  RecruiterValidateOtp: "api/recruiter/ValidateOtp",
  RecruiterUpdatePassword: "api/recruiter/UpdatePassword",

  GetUserProfile: "api/recruiter/GetUserDetails/{userId}",
  SearchResumes:'api/recruiter/SearchResumes',
  GetRecruiterJobs:'api/recruiter/GetRecruiterJobs/{id}',
  SaveCandidateRecruiterMapping: 'api/recruiter/SaveCandidateRecruiterMapping',
  //#endregion

  //#region Jobs
  AddJob: "api/Jobs",
  SearchJobs: "api/Jobs/SearchJobs",
  SaveJob: "api/Jobs/SaveJob",
  ApplyJob: "api/Jobs/ApplyJob",
  GetSavedJobs: "api/Jobs/GetSavedJobs/{userName}",
  GetAppliedJobs: "api/Jobs/GetAppliedJobs/{userName}",
  //#endregion
};
