import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { CreateProfileAPI } from "../../../services/CandidateService/Profile";
import { IsCandidateDetails, LoggedInUserDetails } from "../../../models/types/auth";
import { ArrowForwardIos, ArrowBackIosNew } from "@mui/icons-material";
import { navigationPaths } from "../../../routes/Route";

interface Skills {
  skill: string;
  yrsOfExperience?: number;
}

enum SkillChangeType {
  skill = "skill",
  exp = "exp",
}

interface CreateCandidateProfile {
  firstName: string;
  lastName: string;
  currentCityId: number | "";
  preferredLocation: string;
  currency: number | "";
  currentCTC: string;
  expectedCTC: string;
  noticePeriod: number | "";
  domainId: number | "";
  currentDesignation: string;
  employmentMode: number;
  employmentType: number;
  totalExpInMonths: number | "";
  totalExpInYrs: number | "";
  skillSet: Skills[];
  selectedResume: File | null;
}

const candidateSkills: Skills[] = [
  {
    skill: "",
    yrsOfExperience: undefined,
  },
  {
    skill: "",
    yrsOfExperience: undefined,
  },
  {
    skill: "",
    yrsOfExperience: undefined,
  },
  {
    skill: "",
    yrsOfExperience: undefined,
  },
  {
    skill: "",
    yrsOfExperience: undefined,
  },
];

const initialData: CreateCandidateProfile = {
  firstName: "",
  lastName: "",
  currentCityId: "",
  preferredLocation: "",
  currency: "",
  currentCTC: "",
  expectedCTC: "",
  noticePeriod: "",
  domainId: "",
  currentDesignation: "",
  employmentMode: 1,
  employmentType: 1,
  totalExpInMonths: "",
  totalExpInYrs: "",
  skillSet: candidateSkills,
  selectedResume: null,
};

interface CandidateProfileProps {
  LoginDetails: LoggedInUserDetails;
}

export const CreateProfile = ({ LoginDetails }: CandidateProfileProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(1);
  const [candidateProfile, setCandidateProfile] = useState(initialData);
  const [currentCountry, setCurrentCountry] = useState("");
  const [expectedCountry, setExpectedCountry] = useState("");

  // on Component mount
  useEffect(() => {
    // get Domains
    // Get Empoyment Mode
    // Get Employment Types
  }, []);

  const onFileChange = (event: any) => {
    setCandidateProfile({
      ...candidateProfile,
      selectedResume: event.target.files[0],
    });
  };

  const onInputChange = (event: any) => {
    setCandidateProfile({
      ...candidateProfile,
      [event.target.name]: event.target.value,
    });
  };

  const onSkillChange = (type: SkillChangeType, event: any, index: number) => {
    const _skillSet = candidateProfile.skillSet;
    if (type === SkillChangeType.skill) {
      _skillSet[index].skill = event.target.value;
    } else {
      _skillSet[index].yrsOfExperience = event.target.value;
    }
    setCandidateProfile({
      ...candidateProfile,
      skillSet: _skillSet,
    });
  };

  const onRadioButtonChange = (event: any) => {
    setCandidateProfile({
      ...candidateProfile,
      [event.target.name]: event.target.value,
    });
  };

  const onSelectChange = (event: any) => {
    setCandidateProfile({
      ...candidateProfile,
      [event.target.name]: event.target.value,
    });
  };

  const onCreateProfileSubmit = () => {
    const onSuccess = (response: any) => {
      console.log(response);

      if (response > 0) {
        enqueueSnackbar("Profile created successfully", { variant: "success" });
        navigate(navigationPaths.SearchJobs);
      } else {
        enqueueSnackbar("Error while creating profile", { variant: "error" });
      }
    };
    const onError = (error: any) => {
      console.log(error);
      enqueueSnackbar("Error while creating profile", { variant: "error" });
    };

    const formData = new FormData();
    formData.append(
      "candidateEmailId",
      (LoginDetails &&
        LoginDetails.userDetails && IsCandidateDetails(LoginDetails.userDetails) &&
        LoginDetails.userDetails.userId) ||
        ""
    );
    for (const [key, value] of Object.entries(candidateProfile)) {
      if (value instanceof Array) {
        if (key === "skillSet") {
          const _skillSet = candidateProfile.skillSet.filter(
            (x) => x.skill.length > 0 && x.skill.trim() !== ""
          );
          _skillSet.forEach((item, index) => {
            for (const [_key, _value] of Object.entries(item)) {
              formData.append(`${key}[${index}][${_key}]`, _value);
            }
          });
        }
      } else {
        formData.append(key, value);
      }
    }
    CreateProfileAPI(formData, onSuccess, onError);
  };

  return (
    <>
      <Typography variant="h4" component="h4" textAlign="center">
        Create Profile
      </Typography>
      <br />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          direction="row"
          spacing={1}
        >
          {currentStage === 1 && (
            <>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      name="firstName"
                      fullWidth
                      size="small"
                      label="First Name"
                      type="text"
                      value={candidateProfile.firstName}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Last Name"
                      type="text"
                      name="lastName"
                      value={candidateProfile.lastName}
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Total Exp (Yrs)"
                      type="number"
                      name="totalExpInYrs"
                      value={candidateProfile.totalExpInYrs}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      size="small"
                      label="Total Exp (Months)"
                      type="number"
                      fullWidth
                      name="totalExpInMonths"
                      value={candidateProfile.totalExpInMonths}
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="DomainId"
                      label="Domain"
                      name="domainId"
                      value={candidateProfile.domainId}
                      onChange={onSelectChange}
                      select
                    >
                      <MenuItem value={1}>Full stack</MenuItem>
                      <MenuItem value={2}>Backend</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Current Salary (per Annum)"
                      type="text"
                      name="currentCTC"
                      value={candidateProfile.currentCTC}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="salaryCurrency"
                      label="Currency"
                      name="currency"
                      value={candidateProfile.currency}
                      onChange={onSelectChange}
                      select
                    >
                      <MenuItem value={1}>Indian (Rupees)</MenuItem>
                      <MenuItem value={2}>US (Dollar)</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Notice Period (days)"
                      type="number"
                      name="noticePeriod"
                      value={candidateProfile.noticePeriod}
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="currentCountry"
                      label="Current Country"
                      name="currentCountry"
                      value={currentCountry}
                      onChange={(e) => setCurrentCountry(e.target.value)}
                      select
                    >
                      <MenuItem value="india">India</MenuItem>
                      <MenuItem value="america">America</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="currentCityId"
                      label="Current City"
                      select
                      name="currentCityId"
                      value={candidateProfile.currentCityId}
                      onChange={onSelectChange}
                    >
                      <MenuItem value={1}>Bangalore</MenuItem>
                      <MenuItem value={2}>Chennai</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={8} sm={6} md={4} lg={3}>
                    <TextField
                      size="small"
                      label="Current Role"
                      type="text"
                      name="currentDesignation"
                      value={candidateProfile.currentDesignation}
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={2}>
                  <Grid item xs={4} sm={4} md={3} lg={2} textAlign="right">
                    <Typography component="h6" variant="h6">
                      Upload Resume:
                    </Typography>
                  </Grid>
                  <Grid item xs={4} sm={4} md={3} lg={2}>
                    <FormControl>
                      <label htmlFor="uploadresume">
                        <input
                          hidden
                          accept=".doc,.docx,.pdf,.rtf"
                          id="uploadresume"
                          onChange={onFileChange}
                          type="file"
                        />
                        <Button variant="contained" component="span">
                          Browse File
                        </Button>
                      </label>
                      <Typography variant="caption" color="green">
                        {candidateProfile.selectedResume?.name}
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
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent="center"
                  spacing={2}
                  sx={{ marginBottom: 3 }}
                >
                  <Grid item xs={8} sm={6} md={4} lg={3}></Grid>
                  <Grid item xs={8} sm={6} md={4} lg={3} textAlign="right">
                    <Button
                      variant="outlined"
                      size="small"
                      endIcon={<ArrowForwardIos />}
                      onClick={() => setCurrentStage(currentStage + 1)}
                    >
                      Next
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}

          {currentStage === 2 && (
            <>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent="center"
                  spacing={1}
                  columns={16}
                >
                  <Grid item xs={3}>
                    <FormLabel component="legend">Skill Set:</FormLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <FormLabel component="legend">Skill</FormLabel>
                  </Grid>
                  <Grid item xs={4}>
                    <FormLabel component="legend">Yrs of Experience</FormLabel>
                  </Grid>
                </Grid>
              </Grid>
              {candidateProfile.skillSet.map((skill, index) => (
                <Grid item xs={12}>
                  <Grid
                    container
                    justifyContent="center"
                    spacing={1}
                    columns={16}
                  >
                    <Grid item xs={2}></Grid>
                    <Grid item xs={4} sx={{ textAlign: "center" }}>
                      <TextField
                        size="small"
                        onChange={(event) =>
                          onSkillChange(SkillChangeType.skill, event, index)
                        }
                        value={skill.skill}
                        type="text"
                      />
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: "center" }}>
                      <TextField
                        size="small"
                        value={skill.yrsOfExperience}
                        type="number"
                        onChange={(event) =>
                          onSkillChange(SkillChangeType.exp, event, index)
                        }
                      />
                    </Grid>
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={9} sm={8} md={6} lg={4}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Working Mode</FormLabel>
                      <RadioGroup
                        row
                        name="employmentMode"
                        value={candidateProfile.employmentMode}
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
                          value={3}
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
                        value={candidateProfile.employmentType}
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
                          value={3}
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
                  <Grid item xs={6} sm={5} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Expected Salary (per Annum)"
                      type="text"
                      name="expectedCTC"
                      value={candidateProfile.expectedCTC}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={3} sm={2} md={2} lg={1}></Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={1}>
                  <Grid item xs={0} sm={0} md={2} lg={2}></Grid>
                  <Grid item xs={6} sm={5} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      id="expectedCountry"
                      label="Expected Country"
                      select
                      name="expectedCountry"
                      value={expectedCountry}
                      onChange={(e) => setExpectedCountry(e.target.value)}
                    >
                      <MenuItem value="india">India</MenuItem>
                      <MenuItem value="america">America</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={6} sm={5} md={4} lg={3}>
                    <TextField
                      fullWidth
                      size="small"
                      label="Preferred Location"
                      type="text"
                      name="preferredLocation"
                      value={candidateProfile.preferredLocation}
                      onChange={onInputChange}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid
                  container
                  justifyContent="center"
                  spacing={2}
                  sx={{ marginTop: 2, marginBottom: 3 }}
                >
                  <Grid item xs={6} sm={6} md={4} lg={3}>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<ArrowBackIosNew />}
                      onClick={() => setCurrentStage(currentStage - 1)}
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item xs={6} sm={6} md={4} lg={3} textAlign="right">
                    <Button
                      variant="contained"
                      size="large"
                      onClick={onCreateProfileSubmit}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </>
  );
};
