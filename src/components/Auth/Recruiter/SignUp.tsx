import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import { SignUp } from "../../../services/Recruiter/auth";
import { useSnackbar } from "notistack";

//#region Initial State and its type
interface RecruiterSignUpState {
  lastName: string;
  firstName: string;
  companyName: string;
  countryCode: string;
  phoneNumber: number | "";
  address: string;
  userId: string;
  password: string;
}

const initialState: RecruiterSignUpState = {
  address: "",
  companyName: "",
  countryCode: "",
  userId: "",
  firstName: "",
  lastName: "",
  password: "",
  phoneNumber: "",
};
//#endregion

export const RecruiterSignUp = () => {
  const uniqueId = uuid();
  const { enqueueSnackbar } = useSnackbar();

  const [signUp, setSignUp] = useState(initialState);
  const [reenteredPassword, setReenteredPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const onInPutChange = (e: any) => {
    setSignUp({
      ...signUp,
      [e.target.name]: e.target.value,
    });
  };

  const onSignUp = () => {
    if (isSigningUp) return;

    setIsSigningUp(true);

    const onSuccess = (response: boolean) => {
      console.log(response);
      if (response) {
        enqueueSnackbar("Profile Created successfully", { variant: "success" });
      } else {
        enqueueSnackbar("Error while creating Profile", { variant: "error" });
      }
      setIsSigningUp(false);
    };

    const onError = (error: any) => {
      console.log(error);
      setIsSigningUp(false);
      enqueueSnackbar("Error while creating Profile", { variant: "error" });
    };

    SignUp(signUp, onSuccess, onError);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Paper
        variant="outlined"
        sx={{ paddingLeft: 3, paddingTop: 2, paddingBottom: 2, width: 600 }}
      >
        <Typography
          component="h1"
          variant="h5"
          color="primary"
          fontWeight="bold"
        >
          Create Employer Profile
        </Typography>
        <Grid container mt={1} rowSpacing={2}>
          <Grid item container xs={12} columnSpacing={1}>
            <Grid item xs={5}>
              <TextField
                fullWidth
                id={uniqueId + "lastName"}
                label="Last Name"
                name="lastName"
                type="text"
                size="small"
                value={signUp.lastName}
                onChange={onInPutChange}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                fullWidth
                id={uniqueId + "firstName"}
                label="First Name"
                name="firstName"
                type="text"
                size="small"
                value={signUp.firstName}
                onChange={onInPutChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id={uniqueId + "companyName"}
              label="Company Name"
              name="companyName"
              type="text"
              size="small"
              value={signUp.companyName}
              onChange={onInPutChange}
            />
          </Grid>
          <Grid item container xs={8} columnSpacing={2}>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id={uniqueId + "countryCode"}
                label="code"
                name="countryCode"
                type="text"
                size="small"
                value={signUp.countryCode}
                onChange={onInPutChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id={uniqueId + "phoneNumber"}
                label="Phone number"
                name="phoneNumber"
                type="text"
                size="small"
                value={signUp.phoneNumber}
                onChange={onInPutChange}
              />
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              rows={3}
              id={uniqueId + "address"}
              label="Address"
              name="address"
              type="text"
              multiline
              size="small"
              value={signUp.address}
              onChange={onInPutChange}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id={uniqueId + "userId"}
              label="Email Id"
              name="userId"
              type="email"
              size="small"
              value={signUp.userId}
              onChange={onInPutChange}
            />
          </Grid>
          <Grid item xs={8}>
            <TextField
              fullWidth
              id={uniqueId + "password"}
              label="Password"
              name="password"
              type="password"
              size="small"
              value={signUp.password}
              onChange={onInPutChange}
            />
          </Grid>
          <Grid item container xs={12} spacing={1}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id={uniqueId + "reenteredPassword"}
                label="Re-Enter Password"
                name="reenteredPassword"
                type="password"
                size="small"
                error={
                  signUp.password.length > 0 &&
                  signUp.password != reenteredPassword
                }
                value={reenteredPassword}
                onChange={(e) => setReenteredPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={3} marginLeft={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={onSignUp}
                disabled={isSigningUp}
              >
                {isSigningUp ? "Signing in..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
