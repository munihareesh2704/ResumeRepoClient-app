import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { navigationPaths } from "../../../routes/Route";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  SendOtp,
  UpdatePassword,
  ValidateOtp,
} from "../../../services/Recruiter/auth";

export const ResetRecruiterPassword = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [enableResendOtp, setEnableResendOtp] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [recruiterId, setRecruiterId] = useState(0);

  useEffect(() => {
    if (otpSent) {
      setTimeout(() => {
        setEnableResendOtp(true);
      }, 20000);
    }
  }, [otpSent]);

  const sendOTP = () => {
    const onSuccess = (response: number) => {
      console.log(response);

      if (response == -1) {
        enqueueSnackbar("Profile does not exist, Please sign up!", {
          variant: "info",
        });
        // No Profile is created Yet
      } else if (response == 0) {
        // Error while sending OTP
        enqueueSnackbar("Error while sending OTP", { variant: "error" });
      } else if (response == 1) {
        //OTP sent successfully
        setOtpSent(true);
        enqueueSnackbar("OTP sent successfully", { variant: "success" });
      } else {
        // Unknown
      }
    };

    const onError = (error: any) => {
      console.log(error);
      enqueueSnackbar("Error while sending OTP", { variant: "error" });
    };

    SendOtp(email, onSuccess, onError);
  };

  const validateOTP = () => {
    const onSuccess = (response: any) => {
      setOtpValidated(true);
      console.log(response);
      if (response > 0) {
        // Response is userId
        setRecruiterId(response);
        enqueueSnackbar("OTP validated successfully.", { variant: "success" });
      } else {
        enqueueSnackbar("Invalid OTP.", { variant: "error" });
      }
    };

    const onError = (error: any) => {
      enqueueSnackbar("Error while validating OTP.", { variant: "error" });
    };

    const data = {
      userId: email,
      otp: otp,
    };
    ValidateOtp(data, onSuccess, onError);
  };

  const changePassword = () => {
    const onSuccess = (response: any) => {
      console.log(response);
      if (response > 0) {
        enqueueSnackbar("Password changed successfully", {
          variant: "success",
        });
        setPasswordChanged(true);
        redirectToRecruiterLogin();
      } else {
        enqueueSnackbar("Error while changing password", { variant: "error" });
      }
    };

    const onError = (error: any) => {
      console.log(error);
      enqueueSnackbar("Error while changing password", { variant: "error" });
    };

    const data = {
      id: recruiterId,
      password: newPassword,
    };

    UpdatePassword(data, onSuccess, onError);
  };

  const redirectToRecruiterLogin = () => {
    setTimeout(() => {
      navigate(navigationPaths.RecruiterLogin);
    }, 6000);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            paddingLeft: 4,
            paddingRight: 4,
            paddingTop: 2,
            paddingBottom: 1,
            alignItems: "center",
            width: 400,
          }}
        >
          {passwordChanged ? (
            <>
              <Typography component="h1" variant="h5" color="green">
                Your password successfully changed!!
              </Typography>
              <Typography mt={4} variant="body1">
                Please{" "}
                <Link
                  href={navigationPaths.RecruiterLogin}
                  underline="none"
                  variant="body2"
                >
                  Sign In
                </Link>{" "}
                here
              </Typography>
              <Typography variant="body1">
                You will be redirecting automatically in
              </Typography>
              <Typography variant="body1">6seconds...</Typography>
            </>
          ) : (
            <>
              <Typography
                component="h1"
                variant="h5"
                color="primary"
                fontWeight="bold"
              >
                Reset Password
              </Typography>
              {otpValidated ? (
                <>
                  <Box component="div" sx={{ mt: 1 }}>
                    <Grid container>
                      <Grid item xs={3}>
                        <Typography>Email Id:</Typography>
                      </Grid>
                      <Grid item>{email}</Grid>
                    </Grid>
                    <TextField
                      type="password"
                      name="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      size="small"
                      label="New Password"
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      type="password"
                      name="password"
                      value={reenterPassword}
                      onChange={(e) => setReenterPassword(e.target.value)}
                      size="small"
                      label="Re-Enter new Password"
                      fullWidth
                      margin="normal"
                    />
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2, borderRadius: 5 }}
                      onClick={changePassword}
                    >
                      Change Password
                    </Button>
                  </Box>
                </>
              ) : (
                <Box component="div" sx={{ mt: 1 }}>
                  <Typography variant="caption">
                    Please enter your email id to send OTP
                  </Typography>
                  <TextField
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    size="small"
                    label="Email Id"
                    fullWidth
                    disabled={otpSent}
                    margin="normal"
                  />
                  {otpSent ? (
                    <>
                      <TextField
                        type="number"
                        name="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        size="small"
                        label="OTP"
                        fullWidth
                        margin="normal"
                        InputProps={{
                          endAdornment:(
                            <InputAdornment position="end">
                              {enableResendOtp ? (
                                <Button
                                  size="small"
                                  variant="text"
                                  onClick={sendOTP}
                                >
                                  Resend OTP
                                </Button>
                              ) : (
                                "Resend OTP in 20 seconds"
                              )}
                            </InputAdornment>
                          )
                        }}
                      />
                      {/* <Typography variant="body2">
                        {enableResendOtp ? (
                          <Button size="small" variant="text" onClick={sendOTP}>
                            Resend OTP
                          </Button>
                        ) : (
                          "Resend OTP in 20 seconds"
                        )}
                      </Typography> */}
                      <Button
                        variant="contained"
                        sx={{ mt: 3, mb: 2, borderRadius: 5 }}
                        onClick={validateOTP}
                      >
                        Submit
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      sx={{ mt: 3, mb: 2, borderRadius: 5 }}
                      onClick={sendOTP}
                    >
                      Send OTP
                    </Button>
                  )}
                </Box>
              )}
            </>
          )}
        </Paper>
      </Box>
    </>
  );
};
