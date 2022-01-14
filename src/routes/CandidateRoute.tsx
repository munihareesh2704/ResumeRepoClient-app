import React from 'react';
import { IndexRouteProps, LayoutRouteProps, PathRouteProps, Route } from "react-router-dom";

export default (props: PathRouteProps | LayoutRouteProps | IndexRouteProps) => {
  return <Route {...props} />;
};
