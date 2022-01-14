import React from "react";
import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import {
  LocationOn,
  Apartment as Company,
  Star,
  AttachMoneyOutlined,
  StarOutline,
} from "@mui/icons-material";
import { Job as JobModel } from "../../models/Job";

export interface JobProps {
  job: JobModel;
  fromRecruiter?: boolean;
  onApply?: (jobId: number) => void;
  onSave?: (jobId: number) => void;
}
export const Job = ({ job, onApply, onSave, fromRecruiter }: JobProps) => {
  //() => {
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
                {job.role}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" gutterBottom>
                {job.employmentType}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div">
                <Company />
                {job.employerName}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div">
                <LocationOn />
                {job.location}
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div">
                {job.minExperience} to {job.maxExperience} Yrs
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" gutterBottom component="div">
                {job.skillSet}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom component="div">
              <AttachMoneyOutlined fontSize="small" />
              {job.minSalary} - {job.maxSalary}LPA
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={3}>
          {fromRecruiter ? (
            <Grid item xs={12} mt={4}>
              <b>{job.noOfCandidatesApplied}</b> Candidate(s) Applied
            </Grid>
          ) : (
            <>
              <Grid item xs={12}>
                {!job.isApplied && onSave && (
                  <IconButton size="large" onClick={() => onSave(job.id)}>
                    {job.isSaved ? (
                      <Star color="primary" />
                    ) : (
                      <StarOutline color="secondary" />
                    )}
                  </IconButton>
                )}
              </Grid>
              <Grid item xs={12} mt={4}>
                {!job.isApplied && onApply && (
                  <Button
                    size="large"
                    variant="contained"
                    onClick={(e) => onApply(job.id)}
                  >
                    Apply
                  </Button>
                )}
                {job.isApplied && <Typography variant="h5">Applied</Typography>}
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};
