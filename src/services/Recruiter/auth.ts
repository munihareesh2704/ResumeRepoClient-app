import { APIFragments } from "../common/ApiFragment";
import { Get, Post, Update } from "../common/axios";

export const SignIn = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.RecruiterSingIn,
    data,
    onSuccess,
    onError,
  });
};

export const SignUp = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.RecruiterSignUp,
    data,
    onSuccess,
    onError,
  });
};

export const SendOtp = async (
  userId: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Get({
    url: APIFragments.RecruiterSendOtp.replace("{otp}", userId),
    onSuccess,
    onError,
  });
};

export const ValidateOtp = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.RecruiterValidateOtp,
    data,
    onSuccess,
    onError,
  });
};

export const UpdatePassword = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Update({
    url: APIFragments.RecruiterUpdatePassword,
    data,
    onSuccess,
    onError,
  });
};

export const GetProfile = async (
  userId: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Get({
    url: APIFragments.GetUserProfile.replace("{userId}", userId),
    onSuccess,
    onError,
  });
};
