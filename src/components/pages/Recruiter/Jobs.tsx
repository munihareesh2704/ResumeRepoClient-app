import React, { useEffect, useState } from "react";
import { GetLoggedInUserDetails } from "../../../AuthStore";
import { Job as JobModel } from "../../../models/Job";
import { IsCandidateDetails } from "../../../models/types/auth";
import { useSnackbar } from "notistack";
import { Grid, Typography } from "@mui/material";
import { Job } from "../../Common/Job";
import { v4 as uuidv4 } from "uuid";
import { GetMyJobs } from "../../../services/Recruiter/Job";

export const RecruiterJobs = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [myJobs, setMyJobs] = useState<JobModel[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const logInDetails = GetLoggedInUserDetails();
    if (
      logInDetails &&
      logInDetails.userDetails &&
      !IsCandidateDetails(logInDetails.userDetails)
    ) {
      _getJobs(logInDetails.userDetails.profileId);
    }
  }, []);

  const _getJobs = (recruiterId: number) => {
    const onSuccess = (response: JobModel[]) => {
      enqueueSnackbar("Successfully fetched Jobs", { variant: "success" });
      setMyJobs(response);
      setDataLoaded(true);
    };
    const onError = (error: any) => {
      enqueueSnackbar("Error while fetching Jobs", { variant: "error" });
      console.log(error);
      setDataLoaded(true);
    };

    GetMyJobs(recruiterId, onSuccess, onError);
  };

  if (dataLoaded) {
    if (myJobs.length > 0) {
      return (
        <>
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
            mt={2}
            mb={2}
          >
            {myJobs.map((_) => {
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
                    <Job job={_} fromRecruiter={true} />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </>
      );
    } else {
      return (
        <>
          <Typography textAlign={"center"}>No Jobs posted...</Typography>
        </>
      );
    }
  }
  return <Typography textAlign={"center"}>Loading jobs...</Typography>;
};
