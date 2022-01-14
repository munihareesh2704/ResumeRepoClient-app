import React, { useState } from "react";
import { Grid, TextField, Button, Divider, IconButton } from "@mui/material";
import { Google } from "@mui/icons-material";
import {
  CreateCandidate,
  GetCandidateDetails,
  Login,
  SendOtp,
} from "../../services/CandidateService/loginService";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { CandidateDetails, LoggedInUserDetails } from "../../models/types/auth";
import { GoogleAuth } from "../../constant";
import { useGoogleLogin } from "react-google-login";
import { navigationPaths } from "../../routes/Route";

const maxOtpRetryCount = 3;

interface LoginPageProps {
  OnLoginSuccess(userDetails: LoggedInUserDetails): void;
}

export const CandidateLogin = ({ OnLoginSuccess }: LoginPageProps) => {
  document.title = "Candidate Login";
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [disableSendOtp, setDisableSendOtp] = useState(false);
  const [enableResend, setEnableResend] = useState(true);
  const [otpRetryCount, setOtpRetryCount] = useState(0);

  const sendOtp = () => {
    if (otpRetryCount === maxOtpRetryCount) {
      enqueueSnackbar("You have reached maximum retries");
    } else {
      const onSuccess = (response: any) => {
        console.log(response);

        if (response > 0) {
          if (!isOtpSent) {
            setIsOtpSent(true);
          }
          enqueueSnackbar("OTP sent successfully", { variant: "success" });
        } else {
          enqueueSnackbar("Error while sending OTP", { variant: "error" });
        }
        if (!disableSendOtp) {
          setDisableSendOtp(true);
        }

        if (enableResend) {
          setTimeout(() => {
            setEnableResend(false);
          }, 30000);
        } else {
          setOtpRetryCount(otpRetryCount + 1);
        }
      };
      const onError = (error: any) => {
        console.log(error);
        enqueueSnackbar("Error while sending OTP", { variant: "error" });
      };
      SendOtp(email, onSuccess, onError);
    }
  };

  const loginCandidate = () => {
    const onSuccess = (response: any) => {
      if (response) {
        enqueueSnackbar("Login is successful", { variant: "success" });
        getCandidateDetails();
      } else {
        enqueueSnackbar("Login failed", { variant: "error" });
      }
    };
    const onError = (error: any) => {
      enqueueSnackbar("Login failed", { variant: "error" });
    };
    const data = {
      EmailId: email,
      OTP: otp,
    };
    Login(data, onSuccess, onError);
  };

  const getCandidateDetails = () => {
    const onSucces = (response: CandidateDetails) => {
      console.log(response);
      const userDetails: LoggedInUserDetails = {
        userDetails: response,
        IsGoogleAuthenticated: false,
      };
      enqueueSnackbar("Candidate details fetched successfully", { variant: "success" });

      OnLoginSuccess(userDetails);
      navigate(navigationPaths.HomePage);
    };
    const onError = (error: any) => {
      enqueueSnackbar("Error while getting Candidate Details", { variant: "error" });
    };

    GetCandidateDetails(email, onSucces, onError);
  };

  //#region Google Authentication

  const onGoogleLogInSuccess = (res: any) => {
    const onSuccess = () => {
      getCandidateDetails();
    };
    const onError = () => {};

    CreateCandidate(res.profileObj.email, onSuccess, onError);
  };

  const onGoogleLogInFailure = (res: any) => {
    console.log(res.profileObj.email);
  };

  const { signIn } = useGoogleLogin({
    onSuccess: onGoogleLogInSuccess,
    onFailure: onGoogleLogInFailure,
    clientId: GoogleAuth.ClientId,
    autoLoad: false,
    isSignedIn: false,
    accessType: "online",
  });

  //#endregion

  return (
    <React.Fragment>
      <Grid
        container
        justifyItems="center"
        flexDirection="column"
        rowSpacing={2}
      >
        <Grid item>
          <TextField
            size="small"
            label="Email Id"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
          <Button variant="text" onClick={sendOtp} disabled={disableSendOtp}>
            Send OTP
          </Button>
        </Grid>
        <Grid item>
          <Grid container justifyItems="center" flexGrow={1}>
            <Grid item>
              <TextField
                size="small"
                label="OTP"
                type="number"
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6 Digit OTP"
                disabled={!isOtpSent}
              />
            </Grid>
            <Grid item>
              <Button variant="text" disabled={enableResend}>
                Not Received OTP? Resend it
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button size="small" variant="contained" onClick={loginCandidate}>
            Login
          </Button>
        </Grid>
        <Divider>or</Divider>
        <Grid container>
          <Button
            size="small"
            startIcon={
              <IconButton color="secondary">
                <Google />
              </IconButton>
            }
            onClick={signIn}
          >
            Sign in with Google Account
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
