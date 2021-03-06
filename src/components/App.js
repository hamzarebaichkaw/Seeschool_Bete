import React from "react";
import {
  HashRouter,
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Close as CloseIcon } from "@material-ui/icons";
import useStyles from './styles';
// components
import Layout from "./Layout/Layout";
import Documentation from "./Documentation/Documentation";
import LandingPage from "../pages/landingPage/open-react-template-master/src/App";
// import LandingPage from "../pages/landingPage/LandingPage"

// pages
import Error from "../pages/error/Error";
import Login from "../pages/login/Login";
import ProfileAdmin from "../pages/admin/Admin";
// import LandingPage from "../pages/landingPage/LandingPage";
import Verify from "../pages/verify/Verify";
import Reset from "../pages/reset/Reset";
import { ToastContainer } from "react-toastify";

// context
import { useUserState } from "../context/UserContext";
import parent from "../pages/parent/Parent";

import DashboardAdmin from "../pages/admin/DashboardAdmin/DashboardAdmin";
import Comptabilit√© from "../pages/comptabilit√©/Comptabilit√©";
import Professerus from "../pages/professeurs/Professerus";

import ChooseCHild from "../pages/parent/parentChild/ParentChild";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  const isAuth = isAuthenticated()
  const classes = useStyles();
  function CloseButton({ closeToast, className }) {
    return <CloseIcon className={className} onClick={closeToast} />;
  }

  return (
    <>
      <ToastContainer
        className={classes.toastsContainer}
        closeButton={
          <CloseButton className={classes.notificationCloseButton} />
        }
        closeOnClick={false}
        progressClassName={classes.notificationProgress}
      />
      <HashRouter>
        <Switch>
          {/* <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} /> */}
          <Route exact path="/" render={() => <Redirect to="/homepage" />} />

          <Route
            exact
            path="/app"
            // render={() => <Redirect to="/app/dashboard" />}
            render={() => <Redirect to="/app/profile" />}
          />
          <Route path="/documentation" component={Documentation} />
          <PrivateRoute path="/app" component={Layout} />
          <PublicRoute path="/login" component={Login} />
          <PrivateRoute path="/admin" component={ProfileAdmin} />
          <PrivateRoute path="/Professeur" component={Professerus} />
          <PrivateRoute path="/admin/Dashboard" component={DashboardAdmin} />
          <PrivateRoute path="/parent/child" component={ChooseCHild} />
          <PrivateRoute path="/comptabilite" component={Comptabilit√©} />
          <PrivateRoute path="/parent" component={parent} />
          <MainRoute path="/home" component={LandingPage} />
          <MainRoute path="/HomePage" component={LandingPage} />
          <PublicRoute path="/verify-email" exact component={Verify} />
          <PublicRoute path="/password-reset" exact component={Reset} />
          <Route component={Error} />
        </Switch>
      </HashRouter>
    </>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            React.createElement(component, props)
          ) : (
            <Redirect to={"/login"} />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuth ? (
            <Redirect
              to={{
                pathname: "/app/profile"
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }

  function MainRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          React.createElement(component, props)
        }
      />
    );
  }
}
