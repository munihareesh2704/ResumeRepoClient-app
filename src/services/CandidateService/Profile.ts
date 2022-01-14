import { APIFragments } from "../common/ApiFragment";
import { Get, Post } from "../common/axios";

export const CreateProfileAPI = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.CreateProfile,
    data,
    isFileUpload: true,
    onSuccess,
    onError,
  });
};

export const GetCandiateProfilesById = async (
  id: number,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Get({
    url: APIFragments.GetCandidateProfilesById.replace("{userName}", id.toString()),
    onSuccess,
    onError,
  });
};

// export const AmazonUploadFile = async (
//   data: any,
//   onSuccess: (response: any) => void,
//   onError: (error: any) => void
// ) => {
//   Post({
//     url: APIFragments.uploadFile,
//     data,
//     isFileUpload: true,
//     onSuccess,
//     onError,
//   });
// };
