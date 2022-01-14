import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Job as JobModel } from "../../../models/Job";
import { ApplyJobAPI, GetAppliedJobsAPI, SaveJobAPI } from "../../../services/JobService/jobService";
import { Job } from "../../Common/Job";
import { v4 as uuidv4 } from "uuid";

export const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState<JobModel[]>([]);
  const [savedJobs, setSavedJobs] = useState<JobModel[]>([]);
  
  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  const fetchAppliedJobs = () => {
    const onSuccess = (response: JobModel[]) => {
      setAppliedJobs(response);
    };
    const onError = (error: any) => {
      console.log("Error while fetching saved appliedJobs");
    };

    GetAppliedJobsAPI("munihareesh2704@gmail.com", onSuccess, onError);
  };

  
  const onApplyJob = (jobId: number) => {
    console.log(jobId);
    const onSuccess = (response: any) => {
      
      if (response) {
        console.log(jobId)
        const index = appliedJobs.findIndex((x) => x.id == jobId);
        if (index > -1) {
          appliedJobs[index].isApplied = !appliedJobs[index].isApplied;
          setAppliedJobs(appliedJobs);
        }
      }
    };

    const onError = (response: any) => {
      console.log(response);
    };
    const _job = appliedJobs.find((x) => x.id == jobId);

    const data = {
      jobId: jobId,
      userName: "munihareesh2704@gmail.com",
      isApplied: true,
      isSaved: _job?.isSaved || false,
    };

    ApplyJobAPI(data, onSuccess, onError);
  };

  const onSaveJob = (jobId: number) => {
    console.log(jobId);

    const onSuccess = (response: any) => {
      if (response) {
        console.log(jobId)
        const index = appliedJobs.findIndex((x) => x.id == jobId);
        if (index > -1) {
          appliedJobs[index].isSaved = !appliedJobs[index].isSaved;
          setAppliedJobs(appliedJobs);
        }
      }
    };

    const onError = (response: any) => {
      console.log(response);
    };

    const _job = appliedJobs.find((x) => x.id == jobId);

    const data = {
      jobId: jobId,
      userName: "munihareesh2704@gmail.com",
      isApplied: false,
      isSaved: !(_job?.isSaved || false),
    };

    SaveJobAPI(data, onSuccess, onError);
  };

  return (
    <>
      {appliedJobs.length > 0 ? (
        <Grid
          container
          direction="column"
          spacing={2}
          alignItems="center"
          justifyContent="center"
        >
          {appliedJobs.map((_) => {
            return (
              <Grid
                key={uuidv4()}
                item
                container
                mt={2}
                alignItems="center"
                justifyContent="center"
              >
                <Grid item xs={8}>
                  <Job job={_} onApply={onApplyJob} onSave={onSaveJob} />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography textAlign={"center"}>
          No Jobs found, Please try different search
        </Typography>
      )}
    </>
  );
};
