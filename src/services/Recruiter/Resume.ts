import { APIFragments } from "../common/ApiFragment";
import { Get, Post } from "../common/axios";

export const SearchresumesAPI = (
  data: any,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Post({
    url: APIFragments.SearchResumes,
    data,
    onSuccess,
    onError,
  });
};

export const SaveCandidateRecruiterMappingAPI = (
    data: any,
    onSuccess: (response: any) => void,
    onError: (error: any) => void
  ) => {
    Post({
      url: APIFragments.SaveCandidateRecruiterMapping,
      data,
      onSuccess,
      onError,
    });
  };

