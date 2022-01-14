import React, { Component } from "react";

export default () => {
  return <></>;
};
// import {
//   IndexRouteProps,
//   LayoutRouteProps,
//   PathRouteProps,
//   Route,
//   Navigate,
//   Outlet,
// } from "react-router-dom";

// // export default (props: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {
// //   return <Outlet />;
// //   return <Route {...props} />;
// // };

// interface CustomRouterProps {
//   component: Component;

// }

// export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
//   <Route
//     {...rest}
//     render={(props) => {
//       const currentUser = authenticationService.currentUserValue;
//       if (!currentUser) {
//         // not logged in so redirect to login page with the return url
//         return (
//           <Redirect
//             to={{ pathname: "/login", state: { from: props.location } }}
//           />
//         );
//       }

//       // check if route is restricted by role
//       if (roles && roles.indexOf(currentUser.role) === -1) {
//         // role not authorised so redirect to home page
//         return <Redirect to={{ pathname: "/" }} />;
//       }

//       // authorised so return component
//       return <Component {...props} />;
//     }}
//   />
// );
