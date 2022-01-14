import React, { useEffect } from "react";
import {
  Autocomplete,
  Button,
  Chip,
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
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddJobAPI } from "../../../services/JobService/jobService";
import { v4 as uuidv4 } from "uuid";
import { GetLoggedInUserDetails } from "../../../AuthStore";
import { LoggedInUserDetails } from "../../../models/types/auth";
import { navigationPaths } from "../../../routes/Route";

interface AddJobState {
  role: string;
  location: string;
  employerName: string;
  skillSet: string[];
  minSalary: string;
  maxSalary: string;
  minExperience: number | "";
  maxExperience: number | "";
  selecteJobDescription: File | null;
  employmentMode: number;
  employmentType: number;
}

const initialData: AddJobState = {
  role: "",
  employerName: "",
  location: "",
  minExperience: "",
  minSalary: "",
  skillSet: [],
  selecteJobDescription: null,
  maxExperience: "",
  maxSalary: "",
  employmentMode: 1,
  employmentType: 1,
};

const itemsWidths = {
  xs: 8,
  sm: 7,
  md: 5,
  lg: 4,
};

export const AddJob = () => {
  const [recruiterDetails, setRecruiterDetails] = useState<LoggedInUserDetails>(
    {
      IsGoogleAuthenticated: false,
    }
  );

  useEffect(() => {
    const userDetails = GetLoggedInUserDetails();
    setRecruiterDetails(userDetails);
  }, []);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [job, setJob] = useState(initialData);

  const onInputChange = (event: any) => {
    setJob({
      ...job,
      [event.target.name]: event.target.value,
    });
  };
  const onFileChange = (event: any) => {
    setJob({
      ...job,
      selecteJobDescription: event.target.files[0],
    });
  };

  const onRadioButtonChange = (event: any) => {
    setJob({
      ...job,
      [event.target.name]: event.target.value,
    });
  };

  const handleSkillChange = (skills: string[]) => {
    setJob({
      ...job,
      skillSet: skills,
    });
  };

  const onSubmit = () => {
    const onSuccess = (response: any) => {
      console.log(response);

      if (response) {
        enqueueSnackbar("Job added successfully", { variant: "success" });
        resetForn();
      } else {
        enqueueSnackbar("Error while adding Job", { variant: "error" });
      }
    };
    const onError = (error: any) => {
      console.log(error);
      enqueueSnackbar("Error while adding Job", { variant: "error" });
    };

    const formData = new FormData();
    for (const [key, value] of Object.entries(job)) {
      if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else {
        formData.append(key, value);
      }
    }

    AddJobAPI(formData, onSuccess, onError);
  };

  const resetForn = () => {
    window.location.reload();
  };

  return (
    <>
      {/* <Typography variant="h5" textAlign="center">
        Create Job
      </Typography> */}
      <Grid
        container
        direction="row"
        spacing={2}
        mt={1}
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                size="small"
                label="Role"
                type="text"
                name="role"
                value={job.role}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={8} sm={6} md={4} lg={3}>
              <TextField
                fullWidth
                size="small"
                label="Employer Name"
                type="text"
                name="employerName"
                value={job.employerName}
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
                      color="primary"
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
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8} sm={8} md={6} lg={4}>
              <TextField
                fullWidth
                size="small"
                label="Location"
                type="text"
                name="location"
                value={job.location}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8} sm={6} md={4} lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Min Experienc (Yrs)"
                type="number"
                name="minExperience"
                value={job.minExperience}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={8} sm={6} md={4} lg={2}>
              <TextField
                size="small"
                label="Max Experienc (Yrs)"
                type="number"
                fullWidth
                name="maxExperience"
                value={job.maxExperience}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={8} sm={6} md={4} lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Min Salary (LPA)"
                type="number"
                name="minSalary"
                value={job.minSalary}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={8} sm={6} md={4} lg={2}>
              <TextField
                fullWidth
                size="small"
                label="Max Salary (LPA)"
                type="number"
                name="maxSalary"
                value={job.maxSalary}
                onChange={onInputChange}
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
                  value={job.employmentMode}
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
                  value={job.employmentType}
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
            <Grid item xs={7} sm={6} md={4} lg={3}>
              <FormControl>
                <label htmlFor="attachJobDescription">
                  <input
                    hidden
                    accept=".doc,.docx,.pdf,.rtf"
                    id="attachJobDescription"
                    onChange={onFileChange}
                    type="file"
                  />
                  <Button variant="contained" component="span">
                    Attach Job Description
                  </Button>
                </label>
                <Typography variant="caption" color="green">
                  {job.selecteJobDescription?.name}
                </Typography>
              </FormControl>
            </Grid>
            <Grid item xs={8} sm={6} md={4} lg={3}>
              <Typography variant="body2" sx={{ paddingTop: "16px" }}>
                *.doc, .docx, .pfd, .rtf with max size of 1MB
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          sx={{ marginTop: 1 }}
          size="large"
          onClick={onSubmit}
        >
          Submit
        </Button>
      </Grid>
    </>
  );
};
