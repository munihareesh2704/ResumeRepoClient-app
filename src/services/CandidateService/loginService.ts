import { APIFragments } from "../common/ApiFragment";
import { Get, Post } from "../common/axios";

export const SendOtp = async (
  userName: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.SendCandidateOtp,
    data: userName,
    onSuccess,
    onError,
  });
};

export const Login = (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.LoginCandidate,
    data,
    onSuccess,
    onError,
  });
};

export const CreateCandidate = (
  emailId: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.CreateCandidate,
    data: emailId,
    onSuccess,
    onError,
  });
};

export const GetCandidateDetails = (
  emailId: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Get({
    url: APIFragments.GetCandidate.replace("{userId}", emailId),
    onSuccess,
    onError,
  });
};
