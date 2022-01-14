import { APIFragments } from "../common/ApiFragment";
import { Get, Post } from "../common/axios";

export const AddJobAPI = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.AddJob,
    data,
    isFileUpload: true,
    onSuccess,
    onError,
  });
};

export const SearchJobsAPI = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.SearchJobs,
    data,
    isFileUpload: false,
    onSuccess,
    onError,
  });
};

export const GetSavedJobsAPI = async (
  userName: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Get({
    url: APIFragments.GetSavedJobs.replace("{userName}", userName),
    onSuccess,
    onError,
  });
};

export const GetAppliedJobsAPI = async (
  userName: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Get({
    url: APIFragments.GetAppliedJobs.replace("{userName}", userName),
    onSuccess,
    onError,
  });
};

export const SaveJobAPI = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.SaveJob,
    data,
    isFileUpload: false,
    onSuccess,
    onError,
  });
};

export const ApplyJobAPI = async (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.ApplyJob,
    data,
    isFileUpload: false,
    onSuccess,
    onError,
  });
};
