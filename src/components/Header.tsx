import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Fade,
  ListItemIcon,
  Link,
} from "@mui/material";
import {
  InsertDriveFile,
  AccountCircle,
  Logout,
  Settings,
  AttachMoney,
  ManageAccounts,
  Moving,
  ManageSearch,
} from "@mui/icons-material";
import { IsCandidateDetails, LoggedInUserDetails } from "../models/types/auth";
import { GoogleAuth } from "../constant";
import { useGoogleLogout } from "react-google-login";
import { navigationPaths } from "../routes/Route";

interface HeaderProps {
  LoginDetails?: LoggedInUserDetails | undefined;
  OnLogout(): void;
}

export const AppHeader = ({ LoginDetails, OnLogout }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onGoogleLogOutSuccess = () => {
    console.log("Logout Successful");
    OnLogout();
  };

  const onGoogleLogOutFailure = () => {
    console.log("Logout Failed");
  };

  const { signOut } = useGoogleLogout({
    clientId: GoogleAuth.ClientId,
    onLogoutSuccess: onGoogleLogOutSuccess,
    onFailure: onGoogleLogOutFailure,
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              href="/"
            >
              <InsertDriveFile />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Resume Git
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            {LoginDetails && LoginDetails.userDetails ? (
              IsCandidateDetails(LoginDetails.userDetails) ? (
                <>
                  <IconButton
                    size="large"
                    id="fade-menu"
                    onClick={(e) => handleClick(e)}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <ManageAccounts fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Moving fontSize="small" />
                      </ListItemIcon>
                      Skill Meter
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <AttachMoney fontSize="small" />
                      </ListItemIcon>
                      Salary Meter
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <InsertDriveFile fontSize="small" />
                      </ListItemIcon>
                      Jobs
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>

                    {LoginDetails.IsGoogleAuthenticated ? (
                      <MenuItem onClick={signOut}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    ) : (
                      <MenuItem onClick={OnLogout}>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    )}
                  </Menu>
                </>
              ) : (
                <>
                  <IconButton
                    size="large"
                    id="fade-menu"
                    onClick={(e) => handleClick(e)}
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="fade-menu"
                    MenuListProps={{
                      "aria-labelledby": "fade-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                  >
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <ManageAccounts fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href={navigationPaths.SearchResumes}
                        underline="none"
                      >
                        <ListItemIcon>
                          <ManageSearch fontSize="small" />
                        </ListItemIcon>
                        Search Resumes
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <Link
                        href={navigationPaths.RecruiterJobs}
                        underline="none"
                      >
                        <ListItemIcon>
                          <InsertDriveFile fontSize="small" />
                        </ListItemIcon>
                        {/* <Link
                        href={navigationPaths.RecruiterJobs}
                        underline="none"
                      > */}
                        Jobs
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>
                    <MenuItem onClick={OnLogout}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )
            ) : (
              <Link href={navigationPaths.RecruiterLogin} color="inherit">
                Employer Post Job
              </Link>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
