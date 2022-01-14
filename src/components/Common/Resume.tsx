import React from "react";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  LocationOn,
  Apartment as Company,
  Star,
  AttachMoneyOutlined,
  StarOutline,
  Download,
} from "@mui/icons-material";
import { ResumeModel } from "../../models/ResumeModel";

export interface ResumeProps {
  resume: ResumeModel;
  onSave: (candidateProfileId: number, needToSave: boolean) => void;
  onResumeDownload: (candidateProfileId: number) => void;
}

export const Resume = ({ resume, onSave, onResumeDownload }: ResumeProps) => {
  return (
    <Paper elevation={4}>
      <Grid
        container
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          item
          container
          xs={8}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item>
              <Typography variant="h5" gutterBottom>
                {resume.lastName} {resume.firstName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" gutterBottom>
                {resume.employmentType}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div" color='red'>
                <Company />
                ... Need to confirm this field...
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div">
                <LocationOn />
                {resume.location}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div">
                {resume.totalExpInYrs}.{resume.totalExpInMonths} Yrs
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div">
                {resume.skills}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom component="div">
              {/* <AttachMoneyOutlined fontSize="small" /> */}
              {resume.currentCTC} LPA
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={3}>
          <>
            <Grid item xs={12}>
              <IconButton
                size="large"
                onClick={() => onSave(resume.profileId, !resume.isSaved)}
              >
                {resume.isSaved ? (
                  <Star color="primary" />
                ) : (
                  <StarOutline color="secondary" />
                )}
              </IconButton>
            </Grid>
            <Grid item xs={12} mt={4}>
              <IconButton
                size="large"
                onClick={() => onResumeDownload(resume.profileId)}
              >
                <Download />
              </IconButton>
            </Grid>
          </>
        </Grid>
      </Grid>
    </Paper>
  );
};
