import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Job } from "../../Common/Job";
import { Job as JobModel } from "../../../models/Job";
import {
  ApplyJobAPI,
  SaveJobAPI,
  SearchJobsAPI,
} from "../../../services/JobService/jobService";
interface SearchJobState {
  location: string;
  role: string;
  minExperience: number | "";
  maxExperience: number | "";
  skillSet: string;
  employmentMode: number;
  employmentType: number;
  userName: string;
}

const initialState: SearchJobState = {
  location: "",
  role: "",
  minExperience: "",
  maxExperience: "",
  skillSet: "",
  employmentMode: -1,
  employmentType: -1,
  userName: "munihareesh2704@gmail.com",
};

export const SearchJobs = () => {
  const [searchCriteria, setSearchCriteria] = useState(initialState);
  const [tempSkill, setTempSkill] = useState("");
  const [jobs, setJobs] = useState<JobModel[]>([]);

  const onInputChange = (event: any) => {
    setSearchCriteria({
      ...searchCriteria,
      [event.target.name]: event.target.value,
    });
  };

  const onRadioButtonChange = (event: any) => {
    setSearchCriteria({
      ...searchCriteria,
      [event.target.name]: event.target.value,
    });
  };

  const handleSkillChange = (skills: string[]) => {
    setSearchCriteria({
      ...searchCriteria,
      skillSet: skills.join(","),
    });
  };

  const clearSearchCriteria = () => {
    setSearchCriteria(initialState);
    setTempSkill("");
  };

  const onSearchCriteria = () => {
    const onSuccess = (response: any) => {
      setJobs(response);
    };

    const onError = (response: any) => {
      console.log(response);
    };

    SearchJobsAPI(searchCriteria, onSuccess, onError);
  };

  const onApplyJob = (jobId: number) => {
    console.log(jobId);
    const onSuccess = (response: any) => {
      
      if (response) {
        console.log(jobId)
        const index = jobs.findIndex((x) => x.id == jobId);
        if (index > -1) {
          jobs[index].isApplied = !jobs[index].isApplied;
          setJobs([...jobs]);
        }
      }
    };

    const onError = (response: any) => {
      console.log(response);
    };
    const _job = jobs.find((x) => x.id == jobId);

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
        const index = jobs.findIndex((x) => x.id == jobId);
        if (index > -1) {
          jobs[index].isSaved = !jobs[index].isSaved;
          setJobs([...jobs]);
        }
      }
    };

    const onError = (response: any) => {
      console.log(response);
    };

    const _job = jobs.find((x) => x.id == jobId);

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
      <Box sx={{ flexGrow: 1, margin: 2 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing={1}
        >
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={8} sm={6} md={4} lg={3}>
                <TextField
                  name="location"
                  fullWidth
                  size="small"
                  label="Location"
                  type="text"
                  value={searchCriteria.location}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={8} sm={6} md={4} lg={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Role"
                  type="text"
                  name="role"
                  value={searchCriteria.role}
                  onChange={onInputChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={8} sm={6} md={4} lg={3}>
                <TextField
                  name="minExperience"
                  fullWidth
                  size="small"
                  label="Min Experience (Yrs)"
                  type="number"
                  value={searchCriteria.minExperience}
                  onChange={onInputChange}
                />
              </Grid>
              <Grid item xs={8} sm={6} md={4} lg={3}>
                <TextField
                  fullWidth
                  size="small"
                  label="Max Experience (Yrs)"
                  type="number"
                  name="maxExperience"
                  value={searchCriteria.maxExperience}
                  onChange={onInputChange}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={10} sm={9} md={8} lg={6}>
                <Autocomplete
                  multiple
                  onChange={(event, newValue) => {
                    handleSkillChange(newValue);
                  }}
                  id="skillset"
                  size="small"
                  disableClearable
                  options={[]}
                  freeSolo
                  renderTags={(value: string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        color="warning"
                        label={option}
                        size="small"
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Skill Set"
                      placeholder="Enter the skill"
                      fullWidth
                      size="small"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={9} sm={8} md={6} lg={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Working Mode</FormLabel>
                  <RadioGroup
                    row
                    name="employmentMode"
                    value={searchCriteria.employmentMode}
                    onChange={onRadioButtonChange}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Remote"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Hybrid"
                    />
                    <FormControlLabel
                      value={-1}
                      control={<Radio />}
                      label="Both"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item xs={9} sm={8} md={6} lg={4}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Employment Type</FormLabel>
                  <RadioGroup
                    row
                    name="employmentType"
                    value={searchCriteria.employmentType}
                    onChange={onRadioButtonChange}
                  >
                    <FormControlLabel
                      value={1}
                      control={<Radio />}
                      label="Permanent"
                    />
                    <FormControlLabel
                      value={2}
                      control={<Radio />}
                      label="Part Time"
                    />
                    <FormControlLabel
                      value={-1}
                      control={<Radio />}
                      label="Both"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={6} sm={6} md={4} lg={3}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={clearSearchCriteria}
                >
                  Clear
                </Button>
              </Grid>
              <Grid item xs={6} sm={6} md={4} lg={3} textAlign="right">
                <Button
                  variant="contained"
                  size="small"
                  onClick={onSearchCriteria}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
        {jobs.length > 0 ? (
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {jobs.map((_) => {
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
      </Box>
    </>
  );
};
