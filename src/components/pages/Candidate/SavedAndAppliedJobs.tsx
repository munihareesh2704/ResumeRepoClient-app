import {
  Box,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Job as JobModel } from "../../../models/Job";
import {
  ApplyJobAPI,
  GetAppliedJobsAPI,
  GetSavedJobsAPI,
  SaveJobAPI,
} from "../../../services/JobService/jobService";
import { Job } from "../../Common/Job";
import { v4 as uuidv4 } from "uuid";
import { useSnackbar } from "notistack";

export const SavedAndAppliedJobs = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [showType, setShowType] = useState("savedjobs");
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState<JobModel[]>([]);
  const [savedJobs, setSavedJobs] = useState<JobModel[]>([]);

  useEffect(() => {
    if (showType == "savedjobs") {
      fetchSavedJobs();
    } else {
      fetchAppliedJobs();
    }
  }, [showType]);

  const fetchSavedJobs = () => {
    const onSuccess = (response: JobModel[]) => {
      setSavedJobs(response);
    };
    const onError = (error: any) => {
      enqueueSnackbar("Error while fetching saved savedJobs", {
        variant: "error",
      });
      console.log("Error while fetching saved savedJobs");
    };

    GetSavedJobsAPI("munihareesh2704@gmail.com", onSuccess, onError);
  };

  const fetchAppliedJobs = () => {
    const onSuccess = (response: JobModel[]) => {
      setAppliedJobs(response);
    };
    const onError = (error: any) => {
      enqueueSnackbar("Error while fetching saved appliedJobs", {
        variant: "error",
      });
      console.log("Error while fetching saved appliedJobs");
    };

    GetAppliedJobsAPI("munihareesh2704@gmail.com", onSuccess, onError);
  };

  const onApplyJob = (jobId: number) => {
    console.log(jobId);
    const onSuccess = (response: any) => {
      if (response) {
        debugger;
        console.log(jobId);
        setSavedJobs([...savedJobs.filter((x) => x.id != jobId)]);
      }
    };

    const onError = (response: any) => {
      console.log(response);
    };
    const _job = savedJobs.find((x) => x.id == jobId);

    const data = {
      jobId: jobId,
      userName: "munihareesh2704@gmail.com",
      isApplied: true,
      isSaved: false,
    };

    ApplyJobAPI(data, onSuccess, onError);
  };

  const onToggleSaveJob = (jobId: number) => {
    console.log(jobId);

    const onSuccess = (response: any) => {
      if (response) {
        console.log(jobId);
        setSavedJobs([...savedJobs.filter((x) => x.id != jobId)]);
      }
    };

    const onError = (response: any) => {
      console.log(response);
    };

    const _job = savedJobs.find((x) => x.id == jobId);

    const data = {
      jobId: jobId,
      userName: "munihareesh2704@gmail.com",
      isApplied: false,
      isSaved: false,
    };

    SaveJobAPI(data, onSuccess, onError);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing={1}
        >
          <Grid item xs={4} textAlign="right">
            <Typography variant="h6" component="legend">
              Show:
            </Typography>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={7}>
            <RadioGroup
              row
              name="showjobstype"
              value={showType}
              onChange={(e) => setShowType(e.target.value)}
            >
              <FormControlLabel
                value="savedjobs"
                control={<Radio />}
                label="Saved Jobs"
              />
              <FormControlLabel
                value="appliedjobs"
                control={<Radio />}
                label="Applied Jobs"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <br />
        {showType == "appliedjobs" ? (
          appliedJobs.length > 0 ? (
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
                      <Job job={_} onApply={onApplyJob} onSave={onToggleSaveJob} />
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography variant="h5" textAlign={"center"}>
              No jobs were applied...
            </Typography>
          )
        ) : savedJobs.length > 0 ? (
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {savedJobs.map((_) => {
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
                    <Job job={_} onApply={onApplyJob} onSave={onToggleSaveJob} />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="h5" textAlign={"center"}>
            Save your preferred jobs to apply...
          </Typography>
        )}
      </Box>
    </>
  );
};
