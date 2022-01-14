import React, { useEffect, useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { ResumeModel } from "../../../models/ResumeModel";
import { GetLoggedInUserDetails } from "../../../AuthStore";
import {
  IsCandidateDetails,
  RecruiterDetails,
} from "../../../models/types/auth";
import { Resume } from "../../Common/Resume";
import {
  SaveCandidateRecruiterMappingAPI,
  SearchresumesAPI,
} from "../../../services/Recruiter/Resume";

interface SearchResumeState {
  location: string;
  role: string;
  minExperience: number | "";
  maxExperience: number | "";
  skillSet: string;
  employmentMode: number;
  employmentType: number;
  recruiterId: number;
}

const initialState: SearchResumeState = {
  location: "",
  role: "",
  minExperience: "",
  maxExperience: "",
  skillSet: "",
  employmentMode: -1,
  employmentType: -1,
  recruiterId: 0,
};

export const SearchResumes = () => {
  const [searchCriteria, setSearchCriteria] = useState(initialState);
  const [resumes, setResumes] = useState<ResumeModel[]>([]);
  const [loginDetails, setLoginDetails] = useState<RecruiterDetails>();

  useEffect(() => {
    const _logInDetails = GetLoggedInUserDetails();
    if (
      _logInDetails &&
      _logInDetails.userDetails &&
      !IsCandidateDetails(_logInDetails.userDetails)
    ) {
      setSearchCriteria({
        ...searchCriteria,
        recruiterId: _logInDetails.userDetails.profileId,
      });
    }
  }, []);

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
    setResumes([]);
    const recruiterId = searchCriteria.recruiterId;
    setSearchCriteria(initialState);
    setSearchCriteria({
      ...searchCriteria,
      recruiterId: recruiterId,
    });
  };

  const onSearchCriteria = () => {
    const onSuccess = (response: any) => {
      setResumes(response);
    };

    const onError = (response: any) => {
      console.log(response);
    };

    SearchresumesAPI(searchCriteria, onSuccess, onError);
  };

  const onSaveResume = (candidateProfileId: number, needToSave: boolean) => {
    const onSuccess = (response: boolean) => {
      if (response) {
        console.log(candidateProfileId);
        const index = resumes.findIndex(
          (x) => x.profileId == candidateProfileId
        );
        if (index > -1) {
          resumes[index].isSaved = needToSave;
          setResumes([...resumes]);
        }
      }
    };

    const onError = (response: any) => {
      console.log(response);
    };

    const data = {
      recruiterId: searchCriteria.recruiterId,
      candidateProfileId: candidateProfileId,
      needToSave: needToSave,
    };

    SaveCandidateRecruiterMappingAPI(data, onSuccess, onError);
  };

  const onResumeDownload = (candidateProfileId: number) => {
    const onSuccess = (response: any) => {
      // setResumes(response);
    };

    const onError = (response: any) => {
      console.log(response);
    };

    const data = {
      candidateProfileId: candidateProfileId,
    };
    console.log(data);
  };

  return (
    <>
      <Typography variant="h4" component="h4" color='primary' textAlign="center">
        Search Resumes
      </Typography>
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
        {resumes.length > 0 ? (
          <Grid
            container
            direction="column"
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            {resumes.map((resume) => {
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
                    <Resume
                      resume={resume}
                      onSave={onSaveResume}
                      onResumeDownload={onResumeDownload}
                    />
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography textAlign={"center"}>
            No Resumes found, Please try different search
          </Typography>
        )}
      </Box>
    </>
  );
};
