import { APIFragments } from "../common/ApiFragment";
import { Get } from "../common/axios";

export const GetMyJobs = (
  recruiterId: number,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  Get({
    url: APIFragments.GetRecruiterJobs.replace("{id}", recruiterId.toString()),
    onSuccess,
    onError,
  });
};
