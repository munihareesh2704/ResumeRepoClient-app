export interface Job {
  recruiterId: number;
  employerName: string;
  employmentMode: string;
  employmentModeID: number;
  employmentType: string;
  employmentTypeID: number;
  id: number;
  jobDescriptionLocation: string;
  location: string;
  maxExperience: number;
  maxSalary: number;
  minExperience: number;
  minSalary: number;
  noticePeriod: string;
  role: string;
  skillSet: string;
  isActive: boolean;
  isApplied: boolean;
  isSaved: boolean;
  recruiterStatus: string;
  noOfCandidatesApplied: number;
}
